import moment from "moment";

export function checkDaysToGo(targetDate) {
  const end = moment(targetDate);
  const start = moment();
  return end.to(start, true);
}
