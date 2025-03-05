import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap"; // Importing Bootstrap Components
import PersonCard from "./components/PersonCard"; // Importing PersonCard Components

// Data array which contains classmates' name, favorite color and food
const initialPeople = [
  { id: 1, name: "Meghana", favoriteFood: "Pizza", favoriteColor: "Blue" },
  { id: 2, name: "An", favoriteFood: "Fries", favoriteColor: "Red" },
  { id: 3, name: "Ting", favoriteFood: "Burger", favoriteColor: "Green" },
  { id: 4, name: "Habiba", favoriteFood: "Pasta", favoriteColor: "Pink" }
];

function App() {
  const [people, setPeople] = useState(initialPeople); // State to manage profiles
  const [formData, setFormData] = useState({ name: "", favoriteFood: "", favoriteColor: "" });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add new profiles
  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.favoriteFood || !formData.favoriteColor) {
      alert("Please fill out all fields.");
      return;
    }
    const newProfile = { id: people.length + 1, ...formData };
    setPeople([...people, newProfile]);
    setFormData({ name: "", favoriteFood: "", favoriteColor: "" }); // Reset form
  };

  // Function to delete a profile
  const handleDeleteProfile = (id) => {
    setPeople(people.filter(person => person.id !== id));
  };

  return (
    <Container> {/* Bootstrap Container for space */}
      <h1 className="text-left mt-4">My Classmates</h1> {/* Left Alignment of Page Heading*/}

      {/* Profile Addition Form */}
      <Form className="my-3" onSubmit={handleAddProfile}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Favorite Food"
              name="favoriteFood"
              value={formData.favoriteFood}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Favorite Color"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Button type="submit" variant="primary">Add Profile</Button>
          </Col>
        </Row>
      </Form>

      {/* Mapping over People Array to create a PersonCard for each Classmate */}
      <Row className="justify-content-left"> 
        {people.map((person) => (
          <Col key={person.id} md={6} lg={4} className="mb-3">
            <PersonCard person={person} onDelete={handleDeleteProfile} /> {/* Pass delete function */}
          </Col>
        ))}
      </Row>

      {/* Table View */}
      <h2 className="mt-4">Classmates Table View</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Favorite Food</th>
            <th>Favorite Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.favoriteFood}</td>
              <td>{person.favoriteColor}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProfile(person.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App; // Exports App component
