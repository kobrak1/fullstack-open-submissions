import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote(state, action) {
      const anecdoteIdx = state.findIndex(i => i.id === action.payload.id)
      state[anecdoteIdx] = action.payload
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

// handle voting an anecdote
export const voteAnecdote = (id, item) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(id, {...item, votes: item.votes + 1}) // update the db
    dispatch(setVote(votedAnecdote)) // update the state
    dispatch(setNotification(`${votedAnecdote.content} is voted.`)) // set the notification message
  }
}

export const { appendNote, setNotes, setVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer