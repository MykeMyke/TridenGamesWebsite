import axios from "axios";

export function getUserDetails() {
  const url = "https://unseen-servant.digitaldemiplane.com/auth/user_details/";

  return axios.get(url);
}
