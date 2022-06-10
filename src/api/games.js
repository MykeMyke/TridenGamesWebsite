import axios from "axios";

export function getGames() {
  let url =
    "https://unseen-servant.digitaldemiplane.com/invisibleservant/api/games/";

  return axios.get(url);
}
