import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List, ListItem } from "semantic-ui-react";

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="ReactSport"></Header>
      <List>
        {persons &&
          persons.map((person: any) => (
            <ListItem key={person.id}>
              {person.lName} {person.fName[0]}. {person.mName[0]}.
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default App;
