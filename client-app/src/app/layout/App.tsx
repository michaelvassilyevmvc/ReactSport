import { useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PersonDashboard from "../../features/persons/dashboard/PersonDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { personStore } = useStore();

  useEffect(() => {
    personStore.loadPersons();
  }, [personStore]);

  if (personStore.loadingInitial) {
    return <LoadingComponent content="Loading app"></LoadingComponent>;
  }

  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <PersonDashboard></PersonDashboard>
      </Container>
    </>
  );
}

export default observer(App);
