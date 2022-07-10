import { ChangeEvent, useState, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function PersonForm() {
  const history = useHistory();
  const { personStore } = useStore();
  const { id } = useParams<{ id: string }>();

  const { loadPerson, loadingInitial, createPerson, updatePerson, loading } =
    personStore;

  const [person, setPerson] = useState({
    id: "",
    doB: "",
    fName: "",
    lName: "",
    mName: "",
    iin: "",
  });

  useEffect(() => {
    if (id) loadPerson(id).then((person) => setPerson(person!));
  }, [id, loadPerson]);

  function handleSubmit() {
    if (person.id.length === 0) {
      let newPerson = {
        ...person,
        id: uuid(),
      };

      createPerson(newPerson).then(() =>
        history.push(`/persons/${newPerson.id}`)
      );
    } else {
      updatePerson(person).then(() => history.push(`/persons/${person.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading person..."></LoadingComponent>;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Surname"
          value={person.lName}
          name="lName"
          onChange={handleInputChange}
        ></Form.Input>

        <Form.Input
          placeholder="Name"
          value={person.fName}
          name="fName"
          onChange={handleInputChange}
        ></Form.Input>

        <Form.Input
          placeholder="Middle name"
          value={person.mName}
          name="mName"
          onChange={handleInputChange}
        ></Form.Input>

        <Form.Input
          type="date"
          placeholder="Date of birthday"
          value={person.doB}
          name="doB"
          onChange={handleInputChange}
        ></Form.Input>

        <Form.Input
          placeholder="IIN"
          value={person.iin}
          name="iin"
          onChange={handleInputChange}
        ></Form.Input>

        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          as={Link}
          to="/persons"
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
});
