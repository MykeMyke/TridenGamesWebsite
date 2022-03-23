import axios from 'axios'

export function getGames() {
    let url = 'https://triden.digitaldemiplane.com/invisibleservant/api/games/'

    return axios.get(url)
}
