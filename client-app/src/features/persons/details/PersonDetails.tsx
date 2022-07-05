import { Card, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function PersonDetails() {
  const { personStore } = useStore();
  const {
    selectedPerson: person,
    openForm,
    cancelSelectedPerson,
  } = personStore;

  if (!person) return <LoadingComponent></LoadingComponent>;

  return (
    <Card fluid>
      <Image src={`/assets/person/no-photo.png`}></Image>
      <Card.Content>
        <Card.Header>
          {person.lName} {person.fName} {person.mName}
        </Card.Header>
        <Card.Meta>
          <span>{person.doB}</span>
        </Card.Meta>
        <Card.Description>{person.iin}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(person.id)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            onClick={cancelSelectedPerson}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
