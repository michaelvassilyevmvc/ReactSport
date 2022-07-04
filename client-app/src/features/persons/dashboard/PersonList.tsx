import React, { useState, SyntheticEvent } from "react";
import { Item, Segment, Button } from "semantic-ui-react";
import { Person } from "../../../app/models/person";

interface Props {
  persons: Person[];
  selectPerson: (id: string) => void;
  deletePerson: (id: string) => void;
  submitting: boolean;
}

export default function PersonList({
  persons,
  selectPerson,
  deletePerson,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handlePersonDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deletePerson(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {persons.map((person) => (
          <Item key={person.id}>
            <Item.Content>
              <Item.Header as="a">
                {person.lName} {person.fName} {person.mName}
              </Item.Header>
              <Item.Meta>{person.doB}</Item.Meta>
              <Item.Description>{person.iin}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectPerson(person.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  name={person.id}
                  loading={submitting && target === person.id}
                  onClick={(e) => handlePersonDelete(e, person.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
