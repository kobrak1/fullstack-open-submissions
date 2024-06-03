import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// get all data from db
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// post an anecdote to db
const create = async (content) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

// update the votes
const vote = async (id, content) => {
    const response = await axios.put(`${baseUrl}/${id}`, content)
    return response.data
}

export default { getAll, create, vote }