import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

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

    // function that handles the update of votes in both reducer state and db
    const handleVote = useCallback(async (id) => {
        const item = anecdotes.find(e => e.id === id) // find the item to be updated

        if(item) {
            dispatch(voteAnecdote(id)) // update the state
            dispatch(setNotification(`${item.content} is voted.`)) // set the notification message
            
            await anecdoteService.vote(id, {...item, votes: item.votes + 1}) // update the db
        }
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
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList