const roleState = Object.fromEntries(roles.map((role) => [role, null]));
const favoriteState = Object.fromEntries(roles.map((role) => [role, null]));

let activeRole = "All";
let selectedDetailChampion = null;
let activePremadeId = premadeComps[0].id;
let favoriteVariantsCache = [];
let activeExplorerChampion = "Xin Zhao";

const draftRoomState = {
  turn: 0,
  blue: Object.fromEntries(roles.map((role) => [role, null])),
  red: Object.fromEntries(roles.map((role) => [role, null])),
  blueBans: [],
  redBans: [],
  history: []
};
