function switchView(viewId) {
  document.querySelectorAll(".app-view").forEach((view) => view.classList.toggle("is-hidden", view.id !== viewId));
  document.querySelectorAll(".view-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  if (viewId === "draftRoomView") renderDraftRoom();
  if (viewId === "premadeView") renderPremadeComps();
  if (viewId === "championExplorerView") renderChampionExplorer();
  window.scrollTo({ top: document.querySelector(".view-tabs").offsetTop - 12, behavior: "smooth" });
}

function renderAll() {
  renderChampionGrid();
  renderDraftSlots();
  renderScores();
  renderGamePlan();
  renderDraftWarnings();
  renderFavoriteBuilder();
  renderRecommendations();
  renderCounters();
  renderDraftRoom();
  renderPremadeComps();
  renderChampionExplorer();
}

document.querySelectorAll(".role-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activeRole = button.dataset.role;
    document.querySelectorAll(".role-tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    renderChampionGrid();
  });
});

champSearch.addEventListener("input", renderChampionGrid);

championGrid.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-champion]");
  if (pick) selectChampion(pick.dataset.champion, pick.dataset.role);
});

draftSlots.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clear]");
  if (!button) return;
  clearRole(button.dataset.clear);
});

document.querySelector("#resetDraft").addEventListener("click", resetDraft);

enemyRole.addEventListener("change", () => {
  populateEnemyPicks();
  allyRole.value = enemyRole.value;
  renderCounters();
});

enemyPick.addEventListener("change", renderCounters);
allyRole.addEventListener("change", renderCounters);
counterFocus.addEventListener("change", renderCounters);
counterCount.addEventListener("change", renderCounters);
matchupOffRole.addEventListener("change", renderCounters);

recommendRole.addEventListener("change", renderRecommendations);
recommendGoal.addEventListener("change", () => {
  renderRecommendations();
  renderDraftWarnings();
});
recommendCount.addEventListener("change", renderRecommendations);
allowOffRolePicks.addEventListener("change", renderAll);

favoriteRole.addEventListener("change", populateFavoriteControls);
document.querySelector("#addFavorite").addEventListener("click", addFavoriteChampion);
document.querySelector("#clearFavorites").addEventListener("click", () => {
  clearFavoriteCore();
  renderAll();
});
document.querySelector("#useCurrentPicks").addEventListener("click", lockCurrentPicksAsFavorites);
favoriteCore.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-favorite]");
  if (button) removeFavoriteChampion(button.dataset.removeFavorite);
});
favoriteCompSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-favorite-variant]");
  if (button) loadFavoriteVariant(button.dataset.loadFavoriteVariant);
});

recommendations.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-recommend]");
  if (pick) selectChampion(pick.dataset.recommend, pick.dataset.role);
});

draftWarnings.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-warning-pick]");
  if (pick) selectChampion(pick.dataset.warningPick, pick.dataset.role);
});

counterResults.addEventListener("click", (event) => {
  const pick = event.target.closest("[data-counter-pick]");
  if (!pick) return;
  selectChampion(pick.dataset.counterPick, pick.dataset.role);
  switchView("builderView");
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-details]");
  if (detailButton) showChampionDetails(detailButton.dataset.details);

  const dialogPick = event.target.closest("[data-dialog-pick]");
  if (dialogPick) {
    selectChampion(dialogPick.dataset.dialogPick, dialogPick.dataset.role);
    championDialog.close();
  }
});

document.querySelector("#closeChampionDialog").addEventListener("click", () => championDialog.close());
championDialog.addEventListener("click", (event) => {
  if (event.target === championDialog) championDialog.close();
});

document.querySelectorAll(".view-tab").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

explorerSearch.addEventListener("input", renderExplorerSearchResults);
explorerSearch.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const query = explorerSearch.value.trim().toLowerCase();
  const exact = champions.find((champion) => champion.name.toLowerCase() === query);
  const firstMatch = exact || champions.find((champion) => champion.name.toLowerCase().startsWith(query));
  if (firstMatch) selectExplorerChampion(firstMatch.name);
});
explorerRole.addEventListener("change", renderChampionExplorer);
explorerStrength.addEventListener("change", renderChampionExplorer);
explorerSearchResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-explorer-champion]");
  if (button) selectExplorerChampion(button.dataset.explorerChampion);
});
explorerProfile.addEventListener("click", (event) => {
  const button = event.target.closest("[data-explorer-pick]");
  if (!button) return;
  selectChampion(button.dataset.explorerPick, button.dataset.role);
  switchView("builderView");
});

premadeFilter.addEventListener("change", renderPremadeComps);
premadeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-premade]");
  if (!button) return;
  activePremadeId = button.dataset.premade;
  renderPremadeComps();
});
premadeDetails.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-premade]");
  if (button) loadPremadeComp(button.dataset.loadPremade);
});

document.querySelector("#saveDraft").addEventListener("click", saveCurrentTeam);
document.querySelector("#shareDraft").addEventListener("click", shareCurrentTeam);
document.querySelector("#loadDraft").addEventListener("click", loadSavedTeam);
document.querySelector("#deleteDraft").addEventListener("click", deleteSavedTeam);

draftSearch.addEventListener("input", renderDraftRoom);
draftChampionGrid.addEventListener("click", (event) => {
  const championButton = event.target.closest("[data-draft-champion]");
  const loadButton = event.target.closest("[data-load-side]");
  if (championButton) chooseDraftChampion(championButton.dataset.draftChampion);
  if (loadButton) loadDraftSide(loadButton.dataset.loadSide);
});
draftSuggestions.addEventListener("click", (event) => {
  const championButton = event.target.closest("[data-draft-champion]");
  if (championButton) chooseDraftChampion(championButton.dataset.draftChampion);
});
document.querySelector("#undoDraftRoom").addEventListener("click", undoDraftRoom);
document.querySelector("#resetDraftRoom").addEventListener("click", resetDraftRoom);

hydrateBuiltInChampionProfiles();
loadTeamFromHash();
populateMatchupControls();
refreshSavedTeams();
renderAll();
loadRiotDataDragon();
