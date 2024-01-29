import axios from "axios";

import { apiHost, applyCsrf } from "./utils";

export function getUserDMProfile() {
  return axios.get(`${apiHost}/api/dungeonmasters/me`, { withCredentials: true });
}

export function updateUserDMProfile(updateData) {
  return axios.patch(`${apiHost}/api/dungeonmasters/me/`, updateData, { withCredentials: true, headers: applyCsrf() });
}
