import axios from 'axios'
import { LEAGUEPEDIA_BASE_URL } from './config'

export default axios.create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})
