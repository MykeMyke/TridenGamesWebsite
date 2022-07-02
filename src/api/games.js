import axios from "axios";

export function getGames() {
  let url = "https://unseen-servant.digitaldemiplane.com/api/games/";

  return axios.get(url);
}
