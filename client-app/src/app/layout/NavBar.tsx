import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/sport.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactive Sport
        </Menu.Item>
        <Menu.Item name="Persons"></Menu.Item>
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Person"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
