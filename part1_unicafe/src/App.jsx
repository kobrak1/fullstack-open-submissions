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
const Statistics = (props) => {
  const {good, neutral, bad, total, average, percentage} = props;
  const condition = percentage() < 50 ? "Negative" : "Positive";
  // eslint-disable-next-line use-isnan
  if (isNaN(percentage())) {
    return (
      <h4>No feedback has been given!</h4>
    )
  }
  return (
    <>
      <p>Good: {good} </p>
      <p>Neutral: {neutral} </p>
      <p>Bad: {bad} </p>
      <p> All: {total()} </p>
      <p> Average: {average().toFixed(2)} </p>
      <p> {condition}: {percentage().toFixed(2)}% </p>
    </>
  )
}


const App = () => {
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
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        total={total}
        average={average}
        percentage={percentage}  
      />
    </>
  )
}

export default App;