import { Card, Image, Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PersonDetailedChat from "./PersonDetailedChat";
import PersonDetailedInfo from "./PersonDetailedInfo";
import PersonDetailedSidebar from "./PersonDetailedSidebar";
import PersonDetailedHeader from "./PersonDetailedHeader";

export default observer(function PersonDetails() {
  const { id } = useParams<{ id: string }>();
  const { personStore } = useStore();
  const { selectedPerson: person, loadPerson, loadingInitial } = personStore;

  useEffect(() => {
    if (id) loadPerson(id);
  }, [id, loadPerson]);

  if (loadingInitial || !person) return <LoadingComponent></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PersonDetailedHeader person={person}></PersonDetailedHeader>
        <PersonDetailedInfo person={person}></PersonDetailedInfo>
        <PersonDetailedChat></PersonDetailedChat>
      </Grid.Column>
      <Grid.Column width={6}>
        <PersonDetailedSidebar></PersonDetailedSidebar>
      </Grid.Column>
    </Grid>
  );
});
