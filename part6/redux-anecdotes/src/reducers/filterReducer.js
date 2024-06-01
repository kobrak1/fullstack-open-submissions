import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // reducer filters the anecdotes with the specific value entered in the input field
        filterAnecdote(state, action) {
            state = action.payload
        }
    }
})

export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer