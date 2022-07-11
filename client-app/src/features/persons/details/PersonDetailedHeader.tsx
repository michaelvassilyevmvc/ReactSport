import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Person } from "../../../app/models/person";

const personImageStyle = {
  filter: "brightness(30%)",
};

const personImageTextStyle = {
  position: "absolute",
  buttom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  person: Person;
}

export default observer(function PersonDetailedHeader({ person }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/personCategory.jpg`}
          fluid
          style={personImageStyle}
        ></Image>
        <Segment style={personImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={person.lName}
                  style={{ color: "white" }}
                ></Header>
                <p>{person.doB}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Person</Button>
        <Button>Cancel attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
});
