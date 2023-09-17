/* eslint-disable react/prop-types */
import { useState } from "react"

// componenst here
const Header = ({header}) => {
  return (
    <h2>{header}</h2>
  )
}
// button component
const Button = ({choice, name}) => {
  return (
    <button onClick={choice}> {name} </button>
  )
}
// statistic component
const Statistics = ({good, neutral, bad}) => {
  return (
    <>
    <p>Good: {good} </p>
    <p>Neutral: {neutral} </p>
    <p>Bad: {bad} </p>
    </>
  )
}



function App() {
  // states
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // functions


  return (
    <>
      <Header header={"Give Feedback"} />
      <Button choice={() => setGood(good + 1)} name="Good" />
      <Button choice={() => setNeutral(neutral + 1)} name="Neutral" />
      <Button choice={() => setBad(bad + 1)} name="Bad" /> <br />
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
