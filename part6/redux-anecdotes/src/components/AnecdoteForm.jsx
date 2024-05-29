import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
      }

    return (
        <>        
        <h2>create new</h2>
        <form onSubmit={add}>
          <div><input type='text' name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
        </>
    )
}

AnecdoteForm.propTypes = {
    add: PropTypes.func.isRequired
}

export default AnecdoteForm