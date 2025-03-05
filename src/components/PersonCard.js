import React, { useState } from "react"; // Importing React and useState to handle clicks of "Like" button
import { Card, Button } from "react-bootstrap"; // Importing the components of Bootstrap Card and Button

// Displaying an individual person's information within a Bootstrap Card
const PersonCard = ({ person, onDelete }) => {
  const [likes, setLikes] = useState(0); // useState for tracking the number of likes

  return (
    <Card  className="shadow-sm border-0 rounded p-8 my-1"   // Bootstrap classes for styling card
    style={{ backgroundColor: "#E5E5E5", width: "40rem", height: "9rem",  borderRadius: "12px"  }} // Customized size and background color of card
    >
      <Card.Body>
        <Card.Text>Name: {person.name}</Card.Text>
        <Card.Text>Favorite Food: {person.favoriteFood}</Card.Text>
        {/*Like and Delete Button in the same row*/}
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text>Favorite Color: {person.favoriteColor}</Card.Text>
          <div classname="d-flex">
            {/* Adding the Like Button*/}
          <Button onClick={() => setLikes(likes + 1)} variant="dark">
            Like ({likes})
          </Button>
          {/* Adding the Delete Button */}
          <Button variant="danger" onClick={() => onDelete(person.id)}>
              Delete
            </Button>
        </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
