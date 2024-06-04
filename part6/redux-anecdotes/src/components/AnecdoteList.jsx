import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    // craete a selector for filter and anecdotes reducers
    const filterSelector = createSelector(
        state => state.filter,
        state => state.anecdotes,
        (filter, anecdotes) => {
            const filteredAnecdotes = filter
              ? anecdotes.filter(item => item.content.toLowerCase().includes(filter))
              : anecdotes
            
            return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
        }
    )

    // filtered & sorted anecdotes
    const anecdotes = useSelector(filterSelector)

    const handleVote = useCallback((id, anecdotes) => {
        const item = anecdotes.find(e => e.id === id) // find the item to be voted
        dispatch(voteAnecdote(id, item))
    }, [dispatch, anecdotes])

    console.log('anecdotes:', anecdotes)
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}    
                        <button onClick={() => handleVote(anecdote.id, anecdotes)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList