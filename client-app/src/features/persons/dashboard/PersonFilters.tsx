import { Header, Menu } from "semantic-ui-react";

export default function PersonFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 28 }}>
        <Header icon="filter" attached color="teal" content="Filters"></Header>
        <Menu.Item content="All Persons"></Menu.Item>
        <Menu.Item content="I'm going"></Menu.Item>
        <Menu.Item content="I'm hosting"></Menu.Item>
      </Menu>
    </>
  );
}
