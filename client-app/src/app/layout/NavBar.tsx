import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact as={NavLink} to="/" header>
          <img
            src="/assets/sport.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactive Sport
        </Menu.Item>
        <Menu.Item as={NavLink} to="/persons" name="Persons"></Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createPerson"
            positive
            content="Create Person"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
