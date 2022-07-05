import React from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PersonDetails from "../details/PersonDetails";
import PersonForm from "../form/PersonForm";
import PersonList from "./PersonList";

export default observer(function PersonDashboard() {
  const { personStore } = useStore();
  const { selectedPerson, editMode } = personStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <PersonList></PersonList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedPerson && !editMode && <PersonDetails></PersonDetails>}
        {editMode && <PersonForm></PersonForm>}
      </Grid.Column>
    </Grid>
  );
});
