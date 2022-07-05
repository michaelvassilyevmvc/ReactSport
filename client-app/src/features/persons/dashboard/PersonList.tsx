import { observer } from "mobx-react-lite";
import React, { useState, SyntheticEvent } from "react";
import { Item, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PersonList() {
  const { personStore } = useStore();
  const { deletePerson, personsByDate, loading } = personStore;
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
        {personsByDate.map((person) => (
          <Item key={person.id}>
            <Item.Content>
              <Item.Header as="a">
                {person.lName} {person.fName} {person.mName}
              </Item.Header>
              <Item.Meta>{person.doB}</Item.Meta>
              <Item.Description>{person.iin}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => personStore.selectPerson(person.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  name={person.id}
                  loading={loading && target === person.id}
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
});
