import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PersonDashboard from "../../features/persons/dashboard/PersonDashboard";
import { Person } from "../models/person";
import { v4 as uuid } from "uuid";

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  function handleSelectPerson(id: string) {
    setSelectedPerson(persons.find((x) => x.id === id));
  }

  function handleCancelSelectPerson() {
    setSelectedPerson(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPerson(id) : handleCancelSelectPerson();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditPerson(person: Person) {
    person.id
      ? setPersons([...persons.filter((x) => x.id !== person.id), person])
      : setPersons([...persons, { ...person, id: uuid() }]);

    setEditMode(false);
    setSelectedPerson(person);
  }

  function handleDeletePerson(id: string) {
    setPersons([...persons.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <PersonDashboard
          persons={persons}
          selectedPerson={selectedPerson}
          selectPerson={handleSelectPerson}
          cancelSelectPerson={handleCancelSelectPerson}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPerson}
          deletePerson={handleDeletePerson}
        ></PersonDashboard>
      </Container>
    </>
  );
}

export default App;
