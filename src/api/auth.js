import axios from "axios";

export function getUserDetails() {
  let url;
  if (process.env.NODE_ENV == "development") {
    url = "http://127.0.0.1:8000/auth/user_details/";
  } else {
    url = "https://unseen-servant.tridengames.com/auth/user_details/";
  }

  return axios.get(url, { withCredentials: true });
}

export function doLogout() {
  let url;
  if (process.env.NODE_ENV == "development") {
    url = "http://127.0.0.1:8000/auth/logout/";
  } else {
    url = "https://unseen-servant.tridengames.com/auth/logout/";
  }

  return axios.post(url, { withCredentials: true });
}
