import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    // filtered anecdotes
    const anecdotes = useSelector(state => {
        if(state.filter) {
            return state.anecdotes.filter(item =>
                item.content.toLowerCase().includes(state.filter)
            )
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()

    console.log('anecdotes:', anecdotes)

    // anecdotes sorted by their votes
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes) 

    // helper functions
    const findAnecdote = (id, items) => {
        const anecdote = items.find(a => a.id === id)
        return anecdote.content
    }

    const handleVote = (id, items) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`${findAnecdote(id, items)} is voted.`))
    }

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
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