import axios from "axios";
const baseUrl = 'http://localhost:5001/api/login'
const baseUrls = '/api/blogs' // relative url

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
} 

export default {login}
