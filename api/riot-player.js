const REGION_GROUPS = new Set(["americas", "asia", "europe", "sea"]);
const PLATFORMS = new Set([
  "br1", "eun1", "euw1", "jp1", "kr", "la1", "la2", "na1", "oc1", "tr1", "ru", "sg2", "tw2", "vn2"
]);

const DEFAULT_REGION = "europe";
const DEFAULT_PLATFORM = "euw1";
const MAX_MATCHES = 10;

function send(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", statusCode === 200 ? "s-maxage=60, stale-while-revalidate=240" : "no-store");
  response.end(JSON.stringify(payload));
}

function getQuery(request) {
  const url = new URL(request.url, `https://${request.headers.host || "draft-lantern.local"}`);
  return url.searchParams;
}

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeChoice(value, allowed, fallback) {
  const normalized = cleanText(value).toLowerCase();
  return allowed.has(normalized) ? normalized : fallback;
}

function compactRiotError(status, body) {
  return {
    status,
    message: body?.status?.message || body?.message || "Riot API request failed."
  };
}

async function riotFetch(host, path, apiKey, params = {}) {
  const url = new URL(`https://${host}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": apiKey,
      "Accept": "application/json"
    }
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error("Riot API request failed.");
    error.riot = compactRiotError(response.status, body);
    throw error;
  }
  return body;
}

function getQueuePriority(entry) {
  if (entry.queueType === "RANKED_SOLO_5x5") return 0;
  if (entry.queueType === "RANKED_FLEX_SR") return 1;
  return 2;
}

function getParticipant(match, puuid) {
  return match?.info?.participants?.find((participant) => participant.puuid === puuid) || null;
}

function summarizeMatch(match, puuid) {
  const participant = getParticipant(match, puuid);
  if (!participant) return null;

  const durationMinutes = Math.max(1, (match.info?.gameDuration || 0) / 60);
  const cs = (participant.totalMinionsKilled || 0) + (participant.neutralMinionsKilled || 0);

  return {
    matchId: match.metadata?.matchId || "",
    queueId: match.info?.queueId || 0,
    gameMode: match.info?.gameMode || "",
    gameCreation: match.info?.gameCreation || 0,
    gameDuration: match.info?.gameDuration || 0,
    championName: participant.championName,
    championId: participant.championId,
    teamPosition: participant.teamPosition || participant.individualPosition || "",
    kills: participant.kills || 0,
    deaths: participant.deaths || 0,
    assists: participant.assists || 0,
    win: Boolean(participant.win),
    cs,
    csPerMinute: Number((cs / durationMinutes).toFixed(1)),
    visionScore: participant.visionScore || 0,
    goldEarned: participant.goldEarned || 0,
    damageToChampions: participant.totalDamageDealtToChampions || 0
  };
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    if (key) counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function topCounts(counts, limit = 5) {
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function average(items, getValue) {
  if (!items.length) return 0;
  return Number((items.reduce((total, item) => total + getValue(item), 0) / items.length).toFixed(1));
}

function buildRecentSummary(matches) {
  const wins = matches.filter((match) => match.win).length;
  const losses = matches.length - wins;
  const averageDeaths = average(matches, (match) => match.deaths);
  const averageCsPerMinute = average(matches, (match) => match.csPerMinute);
  const averageVision = average(matches, (match) => match.visionScore);

  const notes = [];
  if (averageDeaths >= 6.5) notes.push("High recent deaths: prioritize safer counters, peel, or simpler execution.");
  if (averageCsPerMinute < 5 && matches.some((match) => ["TOP", "MIDDLE", "BOTTOM"].includes(match.teamPosition))) {
    notes.push("Low farming pace: recommend stable lane picks that can farm under pressure.");
  }
  if (averageVision < 12 && matches.some((match) => ["JUNGLE", "UTILITY"].includes(match.teamPosition))) {
    notes.push("Low vision trend: emphasize setup, sweepers, and champions that create safe vision windows.");
  }
  if (!notes.length) notes.push("Recent games look stable enough to focus on matchup fit and team needs.");

  return {
    games: matches.length,
    wins,
    losses,
    winRate: matches.length ? Number(((wins / matches.length) * 100).toFixed(1)) : 0,
    averageDeaths,
    averageCsPerMinute,
    averageVision,
    topChampions: topCounts(countBy(matches, (match) => match.championName)),
    topRoles: topCounts(countBy(matches, (match) => match.teamPosition || "UNKNOWN")),
    notes
  };
}

async function getRecentMatches(regionHost, puuid, apiKey, count) {
  const matchIds = await riotFetch(
    regionHost,
    `/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
    apiKey,
    { start: 0, count }
  );

  const matchPayloads = await Promise.all(
    matchIds.slice(0, count).map((matchId) =>
      riotFetch(regionHost, `/lol/match/v5/matches/${encodeURIComponent(matchId)}`, apiKey)
        .catch(() => null)
    )
  );

  return matchPayloads
    .map((match) => match && summarizeMatch(match, puuid))
    .filter(Boolean);
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    send(response, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    send(response, 503, {
      ok: false,
      code: "RIOT_API_KEY_MISSING",
      error: "Riot API key is not configured on the server."
    });
    return;
  }

  const query = getQuery(request);
  const gameName = cleanText(query.get("gameName"));
  const tagLine = cleanText(query.get("tagLine"));
  const region = normalizeChoice(query.get("region"), REGION_GROUPS, DEFAULT_REGION);
  const platform = normalizeChoice(query.get("platform"), PLATFORMS, DEFAULT_PLATFORM);
  const matchCount = Math.min(MAX_MATCHES, Math.max(1, Number.parseInt(query.get("matchCount") || "8", 10)));

  if (!gameName || !tagLine) {
    send(response, 400, {
      ok: false,
      error: "Enter a Riot ID game name and tag line."
    });
    return;
  }

  try {
    const regionHost = `${region}.api.riotgames.com`;
    const platformHost = `${platform}.api.riotgames.com`;
    const account = await riotFetch(
      regionHost,
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      apiKey
    );

    const [summoner, mastery, recentMatches] = await Promise.all([
      riotFetch(platformHost, `/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(account.puuid)}`, apiKey),
      riotFetch(platformHost, `/lol/champion-mastery/v4/champion-masteries/by-puuid/${encodeURIComponent(account.puuid)}`, apiKey)
        .catch(() => []),
      getRecentMatches(regionHost, account.puuid, apiKey, matchCount).catch(() => [])
    ]);

    const ranked = await riotFetch(
      platformHost,
      `/lol/league/v4/entries/by-summoner/${encodeURIComponent(summoner.id)}`,
      apiKey
    ).catch(() => []);

    send(response, 200, {
      ok: true,
      source: "Riot API",
      region,
      platform,
      account: {
        gameName: account.gameName,
        tagLine: account.tagLine,
        puuid: account.puuid
      },
      summoner: {
        id: summoner.id,
        profileIconId: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
      },
      ranked: ranked
        .sort((a, b) => getQueuePriority(a) - getQueuePriority(b))
        .map((entry) => ({
          queueType: entry.queueType,
          tier: entry.tier,
          rank: entry.rank,
          leaguePoints: entry.leaguePoints,
          wins: entry.wins,
          losses: entry.losses,
          winRate: entry.wins + entry.losses
            ? Number(((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(1))
            : 0
        })),
      mastery: mastery.slice(0, 8).map((item) => ({
        championId: item.championId,
        championLevel: item.championLevel,
        championPoints: item.championPoints,
        lastPlayTime: item.lastPlayTime
      })),
      recent: {
        summary: buildRecentSummary(recentMatches),
        matches: recentMatches
      }
    });
  } catch (error) {
    const riot = error.riot || { status: 500, message: "Could not reach Riot API." };
    send(response, riot.status === 403 ? 503 : riot.status, {
      ok: false,
      code: riot.status === 403 ? "RIOT_API_KEY_REJECTED" : "RIOT_API_ERROR",
      error: riot.message
    });
  }
};
