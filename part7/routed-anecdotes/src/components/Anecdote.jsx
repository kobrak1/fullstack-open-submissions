const Anecdote = ({ anecdote }) => {
  return (
    <div>
        <h2>Anecdotes</h2>
        <li> {anecdote.content} </li>
    </div>
  )
}

export default Anecdote