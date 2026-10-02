(function () {
  const form = {
    gameName: document.querySelector("#riotGameName"),
    tagLine: document.querySelector("#riotTagLine"),
    platform: document.querySelector("#riotPlatform"),
    region: document.querySelector("#riotRegion"),
    button: document.querySelector("#riotScoutButton"),
    status: document.querySelector("#riotScoutStatus"),
    results: document.querySelector("#riotScoutResults")
  };

  if (!form.button || !form.results) return;

  const platformToRoleRegion = {
    br1: "americas",
    la1: "americas",
    la2: "americas",
    na1: "americas",
    eun1: "europe",
    euw1: "europe",
    tr1: "europe",
    ru: "europe",
    jp1: "asia",
    kr: "asia",
    oc1: "sea",
    sg2: "sea",
    tw2: "sea",
    vn2: "sea"
  };

  function setScoutStatus(text, tone = "offline") {
    form.status.textContent = text;
    form.status.classList.remove("is-loading", "is-ready", "is-offline");
    form.status.classList.add(`is-${tone}`);
  }

  function getRoleFromMatches(matches, championName) {
    const targetChampion = getChampionByRiotApiName(championName);
    const roleCounts = matches
      .filter((match) => getChampionByRiotApiName(match.championName)?.name === targetChampion?.name)
      .reduce((counts, match) => {
        const role = getRoleFromRiotPosition(match.teamPosition);
        if (role) counts[role] = (counts[role] || 0) + 1;
        return counts;
      }, {});
    return Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  }

  function getRankedText(entries) {
    const solo = entries.find((entry) => entry.queueType === "RANKED_SOLO_5x5") || entries[0];
    if (!solo) return "Unranked or no ranked data returned";
    return `${solo.tier} ${solo.rank} ${solo.leaguePoints} LP, ${solo.winRate}% WR`;
  }

  function getKnownChampionRows(data) {
    const matches = data.recent?.matches || [];
    return (data.recent?.summary?.topChampions || [])
      .map((item) => {
        const champion = getChampionByRiotApiName(item.name);
        return {
          ...item,
          champion,
          role: getRoleFromMatches(matches, item.name)
        };
      })
      .filter((item) => item.champion);
  }

  function renderScoutData(data) {
    const summary = data.recent?.summary || {};
    const knownChampionRows = getKnownChampionRows(data);
    const topRoles = (summary.topRoles || [])
      .map((item) => `${getRoleFromRiotPosition(item.name) || item.name}: ${item.count}`)
      .join(", ");

    form.results.innerHTML = `
      <div class="riot-scout__summary">
        <div>
          <span>Riot ID</span>
          <strong>${escapeHtml(data.account.gameName)}#${escapeHtml(data.account.tagLine)}</strong>
        </div>
        <div>
          <span>Ranked</span>
          <strong>${escapeHtml(getRankedText(data.ranked || []))}</strong>
        </div>
        <div>
          <span>Recent form</span>
          <strong>${summary.games || 0} games, ${summary.winRate || 0}% WR</strong>
        </div>
        <div>
          <span>Common roles</span>
          <strong>${escapeHtml(topRoles || "No recent role data")}</strong>
        </div>
      </div>
      <div class="riot-scout__notes">
        ${(summary.notes || []).map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
      </div>
      ${
        knownChampionRows.length
          ? `<div class="riot-scout__champions">
              ${knownChampionRows.map((item) => `
                <button type="button" data-scout-champion="${escapeHtml(item.champion.name)}" data-scout-role="${escapeHtml(item.role || item.champion.roles[0])}">
                  ${getChampionIconMarkup(item.champion, "small")}
                  <span><strong>${escapeHtml(item.champion.name)}</strong><small>${item.count} recent game${item.count === 1 ? "" : "s"}${item.role ? ` as ${escapeHtml(item.role)}` : ""}</small></span>
                </button>
              `).join("")}
            </div>`
          : `<p class="empty-state">Recent champions did not match the local roster yet. The Riot lookup still worked.</p>`
      }
    `;
  }

  async function scoutPlayer() {
    const gameName = form.gameName.value.trim();
    const tagLine = form.tagLine.value.trim();
    if (!gameName || !tagLine) {
      setScoutStatus("Enter Riot ID", "offline");
      form.results.innerHTML = `<p class="empty-state">Enter both parts of a Riot ID, for example game name and tag.</p>`;
      return;
    }

    setScoutStatus("Scouting", "loading");
    form.button.disabled = true;
    form.results.innerHTML = `<p class="empty-state">Pulling Riot account, ranked, mastery, and recent match data...</p>`;

    const params = new URLSearchParams({
      gameName,
      tagLine,
      platform: form.platform.value,
      region: form.region.value,
      matchCount: "8"
    });

    try {
      const response = await fetch(`/api/riot-player?${params.toString()}`);
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Riot lookup failed.");
      }
      riotScoutProfile = data;
      window.riotScoutProfile = data;
      setScoutStatus("Riot connected", "ready");
      renderScoutData(data);
      if (typeof renderChampionExplorer === "function") renderChampionExplorer();
      if (typeof renderChampionTierList === "function") renderChampionTierList();
      window.dispatchEvent(new CustomEvent("riot-scout-loaded", { detail: data }));
    } catch (error) {
      setScoutStatus("Setup needed", "offline");
      form.results.innerHTML = `<p class="empty-state">${escapeHtml(error.message)} ${error.message.includes("key") ? "Add RIOT_API_KEY in Vercel project environment variables, then redeploy." : ""}</p>`;
    } finally {
      form.button.disabled = false;
    }
  }

  form.platform.addEventListener("change", () => {
    const matchingRegion = platformToRoleRegion[form.platform.value];
    if (matchingRegion) form.region.value = matchingRegion;
  });

  form.button.addEventListener("click", scoutPlayer);
  [form.gameName, form.tagLine].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") scoutPlayer();
    });
  });

  form.results.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scout-champion]");
    if (!button) return;
    const champion = getChampion(button.dataset.scoutChampion);
    if (!champion) return;

    if (button.dataset.scoutRole && enemyRole) {
      enemyRole.value = button.dataset.scoutRole;
      populateEnemyPicks();
    }
    if (enemyPick) enemyPick.value = champion.name;
    if (allyRole && enemyRole?.value) allyRole.value = enemyRole.value;
    if (typeof renderCounters === "function") renderCounters();
  });
})();
