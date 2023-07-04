import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <p>button press histroy : {props.allClicks.join(" ")}</p>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = clicks.left + 1;
    setClicks({ ...clicks, left: updatedLeft });
    setTotal(updatedLeft + clicks.right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = clicks.right + 1;
    setClicks({ ...clicks, right: updatedRight });
    setTotal(clicks.left + updatedRight);
  };

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="left" />
      {clicks.right}
      <Button handleClick={handleRightClick} text="right" />
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  );
};

export default App;
