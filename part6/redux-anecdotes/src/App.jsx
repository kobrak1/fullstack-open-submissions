import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log('Anecdotes:', anecdotes);
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  // functions with action creators
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  // JSX code of the application
  return (
    <div>
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
    <AnecdoteForm />
    </div>
  )
}

export default App