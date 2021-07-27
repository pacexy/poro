import axios from 'axios'

const LEAGUEPEDIA_BASE_URL = 'https://lol.fandom.com'

export default axios.create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})
