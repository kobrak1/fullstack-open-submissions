import axios from 'axios'
const baseUrl = 'http://localhost:5001/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// get all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// add a new blog
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// update a blog
const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

// remove a blog
const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error while deleting blog:', error)
    throw new Error('Failed to delete blog.')
  }
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
}