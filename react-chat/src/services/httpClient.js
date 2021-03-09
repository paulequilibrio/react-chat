import axios from 'axios'

const httpClient = axios.create({
  baseURL: `http://${window.location.hostname}:5281/api/`
})

httpClient.interceptors.response.use(
  response => response,
  error => ({ error })
)

export default httpClient
