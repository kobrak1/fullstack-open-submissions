import { useDispatch, useSelector } from "react-redux"
import { filterAnecdote } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()
    const value = useSelector(state => state.filter) // filter reducer state

    // function that handles change on the filter input
    const handleChange = (event) => {
        event.preventDefault()
        dispatch(filterAnecdote(event.target.value))
        event.target.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <input 
                value={value} 
                onChange={handleChange} 
            />
        </div>
    )
}

export default AnecdoteFilter