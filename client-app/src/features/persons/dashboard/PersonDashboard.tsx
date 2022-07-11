import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PersonList from "./PersonList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PersonFilters from "./PersonFilters";

export default observer(function PersonDashboard() {
  const { personStore } = useStore();
  const { loadPersons, personRegistry } = personStore;

  useEffect(() => {
    if (personRegistry.size <= 1) loadPersons();
  }, [personRegistry.size, loadPersons]);

  if (personStore.loadingInitial) {
    return <LoadingComponent content="Loading app"></LoadingComponent>;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <PersonList></PersonList>
      </Grid.Column>
      <Grid.Column width="6">
        <PersonFilters></PersonFilters>
      </Grid.Column>
    </Grid>
  );
});
