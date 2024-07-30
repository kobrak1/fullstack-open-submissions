import { useMemo } from "react"
import { Link } from "react-router-dom"

const Anecdote = ({ anecdote }) => {
  return (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            <li>{ anecdote.content }</li>
            <li>{ anecdote.author }</li>
            <li>{ anecdote.info }</li>
            <li>{ anecdote.votes }</li>
        </ul>
    </div>
  )
}

export default Anecdote