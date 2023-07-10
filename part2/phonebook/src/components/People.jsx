import Person from "./Person";

const People = ({ people, deletePerson }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        );
      })}
      <button>delete</button>
    </>
  );
};

export default People;
