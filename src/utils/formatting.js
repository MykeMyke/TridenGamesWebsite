import moment from "moment";

export function toLocalString(dateTime) {
  let dt = moment(dateTime);
  return dt.format("llll");
}

export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
