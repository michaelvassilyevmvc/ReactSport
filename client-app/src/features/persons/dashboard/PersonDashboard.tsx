import React from "react";
import { Grid } from "semantic-ui-react";
import { Person } from "../../../app/models/person";
import PersonDetails from "../details/PersonDetails";
import PersonForm from "../form/PersonForm";
import PersonList from "./PersonList";

interface Props {
  persons: Person[];
  selectedPerson: Person | undefined;
  selectPerson: (id: string) => void;
  cancelSelectPerson: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (person: Person) => void;
  deletePerson: (id: string) => void;
}

export default function PersonDashboard({
  persons,
  selectedPerson,
  selectPerson,
  cancelSelectPerson,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deletePerson,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <PersonList
          persons={persons}
          selectPerson={selectPerson}
          deletePerson={deletePerson}
        ></PersonList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedPerson && !editMode && (
          <PersonDetails
            person={selectedPerson}
            cancelSelectPerson={cancelSelectPerson}
            openForm={openForm}
          ></PersonDetails>
        )}
        {editMode && (
          <PersonForm
            closeForm={closeForm}
            person={selectedPerson}
            createOrEdit={createOrEdit}
          ></PersonForm>
        )}
      </Grid.Column>
    </Grid>
  );
}
