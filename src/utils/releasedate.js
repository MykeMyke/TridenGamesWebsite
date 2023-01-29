import moment from "moment";
import { toLocalString } from "./formatting";

export function ReleaseDate(patreonDate, generalDate) {
  let ReleaseDate = "";
  const now = moment();
  if (moment(generalDate) < now) {
  } else if (moment(generalDate) > now && moment(patreonDate) < now) {
    ReleaseDate =
      "Patreon Members can sign up now! Releases to everybody on " +
      toLocalString(generalDate);
  } else if (moment(patreonDate) > now) {
    ReleaseDate =
      "Releases to Patreon Members on " + toLocalString(patreonDate);
  } else if (moment(generalDate) > now) {
    ReleaseDate = "Releases to everybody on " + toLocalString(generalDate);
  } else {
    ReleaseDate = "Something strange is going on with these dates...";
  }
  return ReleaseDate;
}
