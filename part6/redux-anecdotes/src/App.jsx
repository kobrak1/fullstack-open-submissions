import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeAll } from './reducers/anecdoteReducer'

import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAll())
  }, [])

  return (
    <div>
      <AnecdoteFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App