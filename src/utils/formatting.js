import moment from "moment";

export function toLocalString(dateTime) {
  let dt = moment(dateTime);
  return dt.format("llll");
}
