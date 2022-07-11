import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Person } from "../../../app/models/person";

interface Props {
  person: Person;
}

export default observer(function PersonDetailedInfo({ person }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info"></Icon>
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Description</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal"></Icon>
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{person.doB}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal"></Icon>
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Some Info</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
