import axios from "axios";

export function getGames() {
  let url =
    "https://unseen-servant.digitaldemiplane.com/unseenservant/api/games/";

  return axios.get(url);
}
