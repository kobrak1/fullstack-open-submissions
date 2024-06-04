import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // vote a specific anecdote
    voteAnecdote(state, action) {
      return state.map(item =>
        item.id !== action.payload
          ? item
          : {...item, votes: item.votes + 1}
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

// initialize all the content
export const initializeAll = () => {
  return async (dispatch) => {
    const allAnecdotes = await anecdoteService.getAll()
    dispatch(setNotes(allAnecdotes))
  }
}

// create a new anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newContent = await anecdoteService.create(content)
    dispatch(appendNote(newContent))
    dispatch(setNotification(`Added new content: ${content}`))
  }
}

export const { voteAnecdote, appendNote, setNotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer