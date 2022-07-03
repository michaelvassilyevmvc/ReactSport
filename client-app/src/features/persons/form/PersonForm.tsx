import React, { ChangeEvent, useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Person } from "../../../app/models/person";

interface Props {
  person: Person | undefined;
  closeForm: () => void;
  createOrEdit: (person: Person) => void;
}

export default function PersonForm({
  person: selectedPerson,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedPerson ?? {
    id: "",
    fName: "",
    mName: "",
    lName: "",
    doB: "",
    iin: "",
  };

  const [person, setPerson] = useState(initialState);

  function handleSubmit() {
    createOrEdit(person);
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
          floated="right"
          positive
          type="submit"
          content="Confirm"
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
}
