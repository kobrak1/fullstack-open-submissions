import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import uuid4 from 'uuid4'

// helper function to create an anecdote object
const asObject = (content) => {
    return {
        content,
        id: uuid4(),
        votes: 0
    }
}

// component to add new anecdotes
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(asObject(content)))   
      }

    return (
        <>        
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type='text'
                        name='anecdote'
                        placeholder='create a new anecdote...'
                        />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm