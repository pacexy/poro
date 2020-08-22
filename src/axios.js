const { leaguepediaLogger } = require('./utils/log')

const LEAGUEPEDIA_BASE_URL = `https://lol.gamepedia.com`

const axios = require('axios').create({
  baseURL: LEAGUEPEDIA_BASE_URL
})

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    return response
  },
  (error) => {
    leaguepediaLogger.error(error)
    return Promise.reject(error)
  },
)

module.exports = axios
