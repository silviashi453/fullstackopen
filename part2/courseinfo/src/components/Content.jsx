import Part from "./Part";

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <Part title={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
