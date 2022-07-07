import { useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PersonDashboard from "../../features/persons/dashboard/PersonDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import PersonFrom from "../../features/persons/form/PersonForm";
import PersonDetails from "../../features/persons/details/PersonDetails";
import PersonForm from "../../features/persons/form/PersonForm";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/persons" component={PersonDashboard}></Route>
              <Route path="/persons/:id" component={PersonDetails}></Route>
              <Route
                key={location.key}
                path={["/createPerson", "/manage/:id"]}
                component={PersonForm}
              ></Route>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
