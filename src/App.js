import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Importing Bootstrap Container
import PersonCard from "./components/PersonCard"; // Importing PersonCard Components

// Data array which contains classmates' name, favorite color and food
const People = [
  { name: "Meghana", favoriteFood: "Pizza", favoriteColor: "Blue" },
  { name: "An", favoriteFood: "Fries", favoriteColor: "Red" },
  { name: "Ting", favoriteFood: "Burger", favoriteColor: "Green" },
  { name: "Habiba", favoriteFood: "Pasta", favoriteColor: "Pink" }
];

function App() {
  return (
    <Container> {/* Bootstrap Container for space */}
      <h1 className="text-left mt-4">My Classmates</h1> {/* Left Alignment of Page Heading*/}
        {/*Mapping over People Array to create a PersonCard for each Classmate*/}
        {People.map((person, index) => (
          <div key={index} className="d-flex justify-content-left my-2"> {/* "d-flex justify-content-left" for left aligning the cards and "my-2" for vertical spacing between the cards */}
            <PersonCard person={person} /> {/* Each Person's data is passed to */}
          </div>
        ))}
    </Container>
  );
}

export default App; // Exports App component
