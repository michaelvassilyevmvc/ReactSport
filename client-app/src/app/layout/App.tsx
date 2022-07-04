import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PersonDashboard from "../../features/persons/dashboard/PersonDashboard";
import { Person } from "../models/person";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Persons.list().then((response) => {
      let persons: Person[] = [];
      response.forEach((person) => {
        person.doB = person.doB.split("T")[0];
        persons.push(person);
      });
      setPersons(persons);
      setLoading(false);
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
    setSubmitting(true);
    if (person.id) {
      agent.Persons.update(person).then(() => {
        setPersons([...persons.filter((x) => x.id !== person.id), person]);
        setSelectedPerson(person);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      person.id = uuid();
      agent.Persons.create(person).then(() => {
        setPersons([...persons, person]);
        setSelectedPerson(person);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeletePerson(id: string) {
    setSubmitting(true);

    agent.Persons.delete(id).then(() => {
      setPersons([...persons.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) {
    return <LoadingComponent content="Loading app"></LoadingComponent>;
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
          submitting={submitting}
        ></PersonDashboard>
      </Container>
    </>
  );
}

export default App;
