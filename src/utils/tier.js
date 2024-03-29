export function checkTier(min, max) {
  let Tier = "Tier?";
  if (min === 1 && max === 4) {
    Tier = "(Tier 1)";
  } else if (min === 5 && max === 10) {
    Tier = "(Tier 2)";
  } else if (min === 11 && max === 16) {
    Tier = "(Tier 3)";
  } else if (min === 17 && max === 20) {
    Tier = "(Tier 4)";
  } else {
    Tier = "(Lvl " + min + " to " + max + ")";
  }
  return Tier;
}

export function checkTierImage(min, max) {
  let Tier = "";
  if (min === 1 && max === 4) {
    Tier = "tier1";
  } else if (min === 5 && max === 10) {
    Tier = "tier2";
  } else if (min === 11 && max === 16) {
    Tier = "tier3";
  } else if (min === 17 && max === 20) {
    Tier = "tier4";
  } else {
    Tier = "specialtier";
  }
  return Tier;
}
