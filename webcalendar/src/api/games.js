import axios from 'axios'

export function getGames() {
    let url = '/invisibleservant/api/games'

    return axios.get(url)
}
