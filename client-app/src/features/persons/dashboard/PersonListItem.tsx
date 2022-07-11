import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Person } from "../../../app/models/person";
import { useStore } from "../../../app/stores/store";

interface Props {
  person: Person;
}

export default function PersonListItem({ person }: Props) {
  const { personStore } = useStore();
  const { deletePerson, loading } = personStore;
  const [target, setTarget] = useState("");

  const personFullName = `${person.lName} ${person.fName} ${person.mName}`;

  function handlePersonDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deletePerson(id);
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/persons/${person.id}`}>
                {personFullName}
              </Item.Header>
              <Item.Description>Hosted by Description</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon>
          {person.doB}
          <Icon name="marker"></Icon>Destination Place
        </span>
      </Segment>
      <Segment clearing>
        <span>Description</span>
        <Button
          as={Link}
          to={`/persons/${person.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
