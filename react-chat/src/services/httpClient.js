import axios from 'axios'

const host = window ? window.location.hostname : 'localhost'

const httpClient = axios.create({
  baseURL: `http://${host}:5281/api/`
})

httpClient.interceptors.response.use(
  response => response,
  error => ({ error })
)

export default httpClient
