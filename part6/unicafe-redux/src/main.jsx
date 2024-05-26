import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
import ThumbUpOutLinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const ok = () => {
    store.dispatch({ type: 'OK' })
  }

  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const zero = () => {
    store.dispatch({ type: 'ZERO' })
  }

  const iconStyle = {
    cursor: 'pointer',
    margin: '1rem 1rem 0 0'
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <ThumbUpOutLinedIcon onClick={good} style={iconStyle} />
      <ThumbsUpDownOutlinedIcon onClick={ok} style={iconStyle} />
      <ThumbDownOffAltOutlinedIcon onClick={bad} style={iconStyle} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
