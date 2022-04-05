import moment from "moment";
import { toLocalString } from "./formatting";

export function ReleaseDate(patreonDate, generalDate) {
  let ReleaseDate = "";

  if (moment(generalDate) < moment()) {
  } else if (moment(generalDate) > moment() && moment(patreonDate) < moment()) {
    ReleaseDate =
      "Patreon Members can sign up now! Releases to everybody on " +
      toLocalString(generalDate);
  } else if (moment(patreonDate) > moment()) {
    ReleaseDate =
      "Releases to Patreon Members on " + toLocalString(patreonDate);
  } else if (moment(generalDate) > moment()) {
    ReleaseDate = "Releases to everybody on " + toLocalString(generalDate);
  } else {
    ReleaseDate = "Something strange is going on with these dates...";
  }
  return ReleaseDate;
}
