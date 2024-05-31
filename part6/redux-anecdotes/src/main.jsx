import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

// main reducer combined with combineReducers function
const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

// redux store
const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)