import { format } from "date-fns";

export function toLocalString(dateTime) {
  return dateTime ? format(dateTime, "eee, LLL d, yyyy h:mm a") : "";
}

export function capitalise(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}
