import axios from "axios";

export function getUserDetails() {
  const url = "https://unseen-servant.digitaldemiplane.com/auth/user_details/";

  return axios.get(url, { withCredentials: true });
}

export function doLogout() {
  const url = "https://unseen-servant.digitaldemiplane.com/auth/logout/";

  return axios.post(url, { withCredentials: true });
}
