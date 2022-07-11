import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PersonListItem from "./PersonListItem";

export default observer(function PersonList() {
  const { personStore } = useStore();
  const { groupedPersons } = personStore;

  return (
    <>
      {groupedPersons.map(([group, persons]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {persons.map((person) => (
            <PersonListItem key={person.id} person={person}></PersonListItem>
          ))}
        </Fragment>
      ))}
    </>
  );
});
