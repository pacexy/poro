const LEAGUEPEDIA_BASE_URL = `https://lol.gamepedia.com`

const axios = require('axios').create({
  baseURL: LEAGUEPEDIA_BASE_URL
})

function setAxiosRequestInterceptor(fulfilled, rejected) {
  axios.interceptors.request.use(fulfilled, rejected);
}

function setAxiosResponseInterceptor(fulfilled, rejected) {
  axios.interceptors.response.use(fulfilled, rejected);
}

module.exports = {
  axios,
  setAxiosRequestInterceptor,
  setAxiosResponseInterceptor
}
