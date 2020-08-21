const leaguepediaUrl = `https://lol.gamepedia.com`

const axios = require('axios').create({
  baseURL: leaguepediaUrl
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
    console.log(error.response.data)
    return Promise.reject(error)
  },
)

exports.axios = axios
