import axios from 'axios'
const baseUrl = 'http://localhost:5001/api'
const baseUrls = '/api' // relative url

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/users`, userData)
  return response.data
}

export default { login, register }
