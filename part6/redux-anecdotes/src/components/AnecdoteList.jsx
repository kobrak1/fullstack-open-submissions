import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    // action creators
    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList