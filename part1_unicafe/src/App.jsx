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
const DetailedStatistics = ({total, average, percentage}) => {
  let condition = "Positive";
  // eslint-disable-next-line use-isnan
  if (isNaN(average()) || isNaN(percentage())) {
    return (
      <>
        <p> All: {total()} </p>
        <p> Average: no data has been entered yet  </p>
        <p> Neutral: no data has been entered yet </p>
      </>
    )
  } else if (percentage() < 50) {
      condition = "Negative"
  }
  return (
    <>
      <p> All: {total()} </p>
      <p> Average: {average()} </p>
      <p> {condition}: {percentage()} </p>
    </>
  )
}


function App() {
  // states
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // functions
  const average = () => (good - bad)/total();
  const total = () => good + neutral + bad;
  const percentage = () => (good / total())*100;

  return (
    <>
      <Header header={"Give Feedback"} />
      <Button choice={() => setGood(good + 1)} name="Good" />
      <Button choice={() => setNeutral(neutral + 1)} name="Neutral" />
      <Button choice={() => setBad(bad + 1)} name="Bad" /> <br />
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <DetailedStatistics total={total} average={average} percentage={percentage} />
    </>
  )
}

export default App;
