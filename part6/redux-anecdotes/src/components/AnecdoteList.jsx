import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

    console.log('anecdotes:', anecdotes)

    const dispatch = useDispatch()
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes) // anecdotes sorted by their votes

    // action creators
    const vote = (id) => {
        dispatch(voteAnecdote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList