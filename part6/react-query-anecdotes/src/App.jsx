import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { create, getAll, update } from "./requests"
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  // Mutations
  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (content) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(content))
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  // add a new anecdote
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  // update an anecdote
  const voteAnecdote = (content) => {
    voteAnecdoteMutation.mutate({...content, votes: content.votes + 1})
  }

  // fetch all data
  const { isLoading, isError, data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  if(isLoading) {
    return <div>Loading data...</div>
  }
  if(isError) {
    return <Notification />
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App