import { createSlice } from '@reduxjs/toolkit'
import uuid4 from 'uuid4'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: uuid4(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
    }
  }
})

export const { newAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer