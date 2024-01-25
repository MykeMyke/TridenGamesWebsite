import { isBefore, isAfter } from "date-fns";
import { toLocalString } from "./formatting";

export function ReleaseDate(patreonDate, generalDate) {
  let ReleaseDate = "";
  const now = new Date();
  if (isBefore(generalDate, now)) {
    ReleaseDate = "Available for General Signup";
  } else if (isAfter(generalDate, now) && isBefore(patreonDate, now)) {
    ReleaseDate =
      "Patreon Members can sign up now! Releases to everybody on " +
      toLocalString(generalDate);
  } else if (isAfter(patreonDate, now)) {
    ReleaseDate =
      "Releases to Patreon Members on " + toLocalString(patreonDate);
  } else if (isAfter(generalDate, now)) {
    ReleaseDate = "Releases to everybody on " + toLocalString(generalDate);
  } else {
    ReleaseDate = "Something strange is going on with these dates...";
  }
  return ReleaseDate;
}
