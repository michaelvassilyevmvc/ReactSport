import { ChangeEvent, useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function PersonForm() {
  const { personStore } = useStore();

  const { selectedPerson, closeForm, createPerson, updatePerson, loading } =
    personStore;

  const initialState = selectedPerson ?? {
    id: "",
    doB: "",
    fName: "",
    lName: "",
    mName: "",
    iin: "",
  };

  const [person, setPerson] = useState(initialState);

  function handleSubmit() {
    person.id ? updatePerson(person) : createPerson(person);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  }

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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
});
