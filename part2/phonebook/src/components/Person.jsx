const Person = ({ person, deletePerson }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  );
};

export default Person;
