import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonsTable from "./components/PersonsTable";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const timeout = 5000;
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const deleteHandle = ({ id, name }) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deleteId(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value.toLowerCase();

    const newVisibility = (person) => {
      return {
        ...person,
        visible: person.name.toLowerCase().includes(newFilter),
      };
    };

    setPersons(persons.map((person) => newVisibility(person)));
  };

  const setMessageWithTimeout = (message, timeout) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, timeout);
  };

  const setErrorMessageWithTimeout = (message, timeout) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, timeout);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const index = persons.findIndex((element) => element.name === newName);

    if (index !== -1) {
      const nameAlreadyAddedMessage = `${newName} already added! Do you want to replace phone number?`;

      if (window.confirm(nameAlreadyAddedMessage)) {
        personsService
          .update(persons[index].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== persons[index].id
                  ? person
                  : { ...returnedPerson, visible: true }
              )
            );
            const numberUpdatedMessage = `${returnedPerson.name} phone number updated`;
            setMessageWithTimeout(numberUpdatedMessage, timeout);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              setErrorMessageWithTimeout(error.response.data.error, timeout);
            } else {
              console.log(error);
              setPersons(
                persons.filter((person) => person.id !== persons[index].id)
              );
              setErrorMessageWithTimeout(
                `${newName} has already been deleted`,
                timeout
              );
            }
          });
      }
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat({ ...returnedPerson, visible: true }));
          setMessageWithTimeout(`${returnedPerson.name} added`, timeout);
        })
        .catch((error) =>
          setErrorMessageWithTimeout(error.response.data.error, timeout)
        );
    }
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) =>
        setPersons(
          initialPersons.map((person) => ({ ...person, visible: true }))
        )
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Phonebook</h1>
        <Notification message={successMessage} isError={false} />
        <Notification message={errorMessage} isError={true} />
        <Filter handleFilterChange={handleFilterChange} />
        <h3>Add new</h3>
        <Form
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onAddClick={handleSubmit}
          newName={newName}
          newNumber={newNumber}
        />
        <h3>Numbers</h3>
        <PersonsTable persons={persons} onDeleteClick={deleteHandle} />
      </header>
    </div>
  );
};

export default App;
