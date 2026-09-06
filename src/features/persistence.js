const SAVED_DRAFTS_KEY = "draft-lantern-saved-teams";

function getSavedTeams() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_DRAFTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setSaveStatus(message) {
  saveStatus.textContent = message;
  window.clearTimeout(setSaveStatus.timeout);
  setSaveStatus.timeout = window.setTimeout(() => {
    saveStatus.textContent = "";
  }, 2600);
}

function refreshSavedTeams() {
  const saved = getSavedTeams();
  savedDrafts.innerHTML = saved.length
    ? saved.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("")
    : `<option value="">No saved teams</option>`;
  document.querySelector("#loadDraft").disabled = !saved.length;
  document.querySelector("#deleteDraft").disabled = !saved.length;
}

function saveCurrentTeam() {
  const team = selectedChampions();
  if (!team.length) {
    setSaveStatus("Add at least one champion first.");
    return;
  }

  const saved = getSavedTeams();
  const name = team.map((champion) => champion.name).join(" + ");
  saved.unshift({
    id: `${Date.now()}`,
    name,
    picks: { ...roleState }
  });
  localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(saved.slice(0, 20)));
  refreshSavedTeams();
  setSaveStatus("Team saved on this device.");
}

function loadSavedTeam() {
  const selected = getSavedTeams().find((item) => item.id === savedDrafts.value);
  if (!selected) return;
  clearFavoriteCore();
  roles.forEach((role) => {
    roleState[role] = getChampion(selected.picks[role]) ? selected.picks[role] : null;
  });
  renderAll();
  setSaveStatus("Saved team loaded.");
}

function deleteSavedTeam() {
  const saved = getSavedTeams().filter((item) => item.id !== savedDrafts.value);
  localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(saved));
  refreshSavedTeams();
  setSaveStatus("Saved team deleted.");
}

function getShareUrl() {
  const picks = Object.fromEntries(roles.map((role) => [role, roleState[role]]));
  const payload = encodeURIComponent(JSON.stringify(picks));
  return `${window.location.href.split("#")[0]}#team=${payload}`;
}

async function shareCurrentTeam() {
  if (!selectedChampions().length) {
    setSaveStatus("Add at least one champion first.");
    return;
  }

  const url = getShareUrl();
  window.location.hash = url.split("#")[1];
  try {
    await navigator.clipboard.writeText(url);
    setSaveStatus("Team link copied.");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = url;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    setSaveStatus("Team link copied.");
  }
}

function loadTeamFromHash() {
  if (!window.location.hash.startsWith("#team=")) return;
  try {
    const picks = JSON.parse(decodeURIComponent(window.location.hash.slice(6)));
    clearFavoriteCore();
    roles.forEach((role) => {
      roleState[role] = typeof picks[role] === "string" ? picks[role] : null;
    });
  } catch {
    window.location.hash = "";
  }
}
