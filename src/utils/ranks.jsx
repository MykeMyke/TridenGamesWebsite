export function hasDMRank(ranks) {
  let validDMRanks = ["Master Code Wizard", "Admin", "Dungeon Master"];

  let matchFound = ranks.filter(function (r) {
    if (validDMRanks.includes(r.name)) return true;
    return false;
  });
  return matchFound.length > 0;
}
