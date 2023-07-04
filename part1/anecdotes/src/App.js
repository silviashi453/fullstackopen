import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const SelectedAnecdote = ({ anecdotes, vote, index }) => {
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {vote[index]} votes</p>
    </div>
  );
};

const BestAnecdote = ({ anecdotes, vote }) => {
  const largestNumber = Math.max(...vote);
  const largestIndex = vote.indexOf(largestNumber);

  if (largestNumber === 0) {
    return <div>No votes yet</div>;
  }

  return (
    <div>
      <p>{anecdotes[largestIndex]}</p>
      <p>has {vote[largestIndex]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Uint8Array(8));

  const handleSelected = () => {
    const number = Math.floor(Math.random() * 8);
    setSelected(number);
  };

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <SelectedAnecdote anecdotes={anecdotes} vote={vote} index={selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleSelected} text="next anecdotes" />
      <Header text="Anecdotes with most votes" />
      <BestAnecdote anecdotes={anecdotes} vote={vote} />
    </div>
  );
};

export default App;
