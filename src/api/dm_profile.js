import axios from "axios";

export function getUserDMProfile() {
  return axios.get(`${apiHost}/dungeonmaster`, { withCredentials: true });
}
