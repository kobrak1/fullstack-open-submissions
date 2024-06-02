import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // add new anecdotes
    newAnecdote(state, action) {
      const newItem = action.payload
      state.push(newItem)
    },
    // vote a specific anecdote
    voteAnecdote(state, action) {
      return state.map(item =>
        item.id !== action.payload
          ? item
          : {...item, votes: item.votes + 1}
      )
    },
  }
})

export const { newAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer