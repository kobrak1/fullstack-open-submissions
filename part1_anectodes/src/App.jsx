/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({func, name}) => {
  return (
    <button onClick={func}> {name} </button>
  )
}

const Anecdote = ({anecdote, vote}) => {
  return (
    <>
      <div> {anecdote} </div>
      <div> Has {vote} votes. </div>
    </>
    
  )
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const indexOfMaxVotes = votes.indexOf(maxVotes);

  if (maxVotes === 0) {
    return <p>No votes yet.</p>;
  }

  return (
    <div>
      <h2>Anecdote With Most Votes</h2>
      <p>{anecdotes[indexOfMaxVotes]}</p>
      <p>Has {maxVotes} votes.</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initialVotes = new Array(anecdotes.length).fill(0); // Her bir söz için başlangıçta 0 oy

  // hooks 
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  // functions
  const randomIndex = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const increaseVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
    return (updatedVotes)
  };

  console.log(votes)
  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button func={increaseVote} name="Vote" />
      <Button func={randomIndex} name="Generate" /> <hr />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App;