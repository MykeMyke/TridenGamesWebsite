const validDMRanks = ["Master Code Wizard", "Admin", "Dungeon Master", "asdf"];

export function hasDMRank(ranks) {
  return ranks && !!ranks.filter(rank => validDMRanks.includes(rank.name)).length;
}

