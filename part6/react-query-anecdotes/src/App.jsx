import { useQuery } from "@tanstack/react-query"
import { getAll } from "./requests"
import ErrorComponent from "./components/ErrorComponent"

const App = () => {
  const { isLoading, isSuccess, data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  if(isLoading) {
    return <div>Loading data...</div>
  }
  if(isSuccess === false) {
    return <ErrorComponent />
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
            <button>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App