import { Card, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default observer(function PersonDetails() {
  const { id } = useParams<{ id: string }>();
  const { personStore } = useStore();
  const { selectedPerson: person, loadPerson, loadingInitial } = personStore;

  useEffect(() => {
    if (id) loadPerson(id);
  }, [id, loadPerson]);

  if (loadingInitial || !person) return <LoadingComponent></LoadingComponent>;

  return (
    <Card fluid>
      <Image
        src={`/assets/person/no-photo.png`}
        style={{ width: "500px", margin: "0 auto" }}
      ></Image>
      <Card.Content>
        <Card.Header>
          {person.lName} {person.fName} {person.mName}
        </Card.Header>
        <Card.Meta>
          <span>{person.doB}</span>
        </Card.Meta>
        <Card.Description>{person.iin}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${person.id}`}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            as={Link}
            to="/persons"
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
