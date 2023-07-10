import { useState } from "react";
import Filter from "./components/Filter";
import People from "./components/People";
import PersonForm from "./components/PersonForm";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((allPeople) => setPeople(allPeople));
  }, []);

  const peopleToShow = people.filter((person) => {
    const name = person.name.toLowerCase();
    const filterLowerCase = filter ? filter.toLowerCase() : filter;
    return name.includes(filterLowerCase);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentPersonList = people.filter(
      (person) => person.name.trim() === newName.trim()
    );
    if (currentPersonList.length > 0) {
      const alertText = `${newName.trim()} is already added to the phonebook, 
      replace the old number to the one?`;
      if (window.confirm(alertText)) {
        const currentPerson = currentPersonList[0];
        const updatedObject = { ...currentPerson, number: newNumber };
        personService
          .updatePerson(currentPerson.id, updatedObject)
          .then((updatedPerson) => {
            setPeople(
              people
                .filter((person) => person.id !== updatedPerson.id)
                .concat(updatedPerson)
            );
            setNotifMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setNotifMessage(null);
            }, 3000);
          });
      }
    } else {
      const peopleObject = {
        id: people.length + 1,
        name: newName,
        number: newNumber,
      };
      personService.createPerson(peopleObject).then((createdPerson) => {
        setPeople(people.concat(createdPerson));
        setNotifMessage(`Added ${createdPerson.name}`);
        setTimeout(() => {
          setNotifMessage(null);
        }, 3000);
      });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPeople(people.filter((note) => note.id !== person.id));
          setNotifMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setNotifMessage(null);
          }, 3000);
        })
        .catch(() => {
          alert(`Person was already deleted from the server`);
          setPeople(people.filter((note) => note.id !== person.id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <Filter value={filter} handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <People people={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
