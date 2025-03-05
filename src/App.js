import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal
} from "react-bootstrap";
import PersonCard from "./components/PersonCard";


// A list of initial classmates to display when the app starts
const initialPeople = [
  { id: 1, name: "Meghana", favoriteFood: "Pizza", favoriteColor: "Blue" },
  { id: 2, name: "An", favoriteFood: "Fries", favoriteColor: "Red" },
  { id: 3, name: "Ting", favoriteFood: "Burger", favoriteColor: "Green" },
  { id: 4, name: "Habiba", favoriteFood: "Pasta", favoriteColor: "Pink" }
];

function App() {
  // Holds the entire list of profiles
  const [people, setPeople] = useState(initialPeople);

  // Manages the form inputs for adding a new profile
  const [formData, setFormData] = useState({
    name: "",
    favoriteFood: "",
    favoriteColor: ""
  });

  // Controls whether the Edit Profile modal is shown
  const [showEditModal, setShowEditModal] = useState(false);

  // Holds the data for whichever profile we're editing
  const [editFormData, setEditFormData] = useState({
    id: null,
    name: "",
    favoriteFood: "",
    favoriteColor: ""
  });

  // Pagination: which page we're on and how many rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Sorting & Filtering: which field to sort by, and what text to filter on
  const [sortOption, setSortOption] = useState("none");
  const [searchText, setSearchText] = useState("");

  // Updates the add-form state whenever the user types in an input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Simple check to ensure the text has only letters and spaces
  const isValidText = (text) => /^[A-Za-z\s]+$/.test(text);

  // Adds a new profile to the list after validating the inputs
  const handleAddProfile = (e) => {
    e.preventDefault();

    // Make sure all fields are filled
    if (!formData.name || !formData.favoriteFood || !formData.favoriteColor) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate text fields so they don't contain numbers or special chars
    if (!isValidText(formData.name)) {
      alert("Name must contain only letters and spaces.");
      return;
    }
    if (!isValidText(formData.favoriteFood)) {
      alert("Favorite Food must contain only letters and spaces.");
      return;
    }
    if (!isValidText(formData.favoriteColor)) {
      alert("Favorite Color must contain only letters and spaces.");
      return;
    }

    // Create a new profile object
    const newProfile = { id: people.length + 1, ...formData };

    // Update state to include the new profile
    setPeople([...people, newProfile]);

    // Reset the form fields
    setFormData({ name: "", favoriteFood: "", favoriteColor: "" });
  };

  // Removes a profile by filtering it out
  const handleDeleteProfile = (id) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  // Opens the Edit modal, pre-filling with the selected person's details
  const handleEditClick = (person) => {
    setEditFormData(person);
    setShowEditModal(true);
  };

  // Updates the editFormData as the user types inside the Edit modal
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  // Saves the changes made to a profile, then closes the Edit modal
  const handleSaveEdit = (e) => {
    e.preventDefault();

    // Make sure the user filled out all fields in the Edit form
    if (
      !editFormData.name ||
      !editFormData.favoriteFood ||
      !editFormData.favoriteColor
    ) {
      alert("Please fill out all fields before saving.");
      return;
    }

    // Validate the text fields in the Edit form
    if (!isValidText(editFormData.name)) {
      alert("Name must contain only letters and spaces.");
      return;
    }
    if (!isValidText(editFormData.favoriteFood)) {
      alert("Favorite Food must contain only letters and spaces.");
      return;
    }
    if (!isValidText(editFormData.favoriteColor)) {
      alert("Favorite Color must contain only letters and spaces.");
      return;
    }

    // Update the existing array, replacing the old data with the new edits
    const updatedPeople = people.map((p) =>
      p.id === editFormData.id ? { ...editFormData } : p
    );
    setPeople(updatedPeople);

    // Close the Edit modal
    setShowEditModal(false);
  };

  // Cancels editing and hides the modal
  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  // Allows the user to change how many records appear on each page
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handles pagination: next, previous, or jump to a specific page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle sorting changes
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to page 1 when changing sort
  };

  // Handle filter text changes
  const handleFilterChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  // 1) Create a copy of the array to avoid mutating the original
  let filteredPeople = [...people];

  // 2) Filtering: only show rows matching the search text in name, food, or color
  if (searchText.trim() !== "") {
    filteredPeople = filteredPeople.filter((person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase()) ||
      person.favoriteFood.toLowerCase().includes(searchText.toLowerCase()) ||
      person.favoriteColor.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // 3) Sorting: apply alphabetical sort based on the selected option
  if (sortOption === "name") {
    filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "favoriteFood") {
    filteredPeople.sort((a, b) => a.favoriteFood.localeCompare(b.favoriteFood));
  } else if (sortOption === "favoriteColor") {
    filteredPeople.sort((a, b) => a.favoriteColor.localeCompare(b.favoriteColor));
  }
  // If sortOption is "none", we leave the array as-is

  // 4) Pagination: figure out which slice of the array to show
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPeople = filteredPeople.slice(startIndex, endIndex);

  // Calculate total pages after filtering
  const totalPages = Math.ceil(filteredPeople.length / pageSize);

  // Track whether dark mode is active
const [isDarkMode, setIsDarkMode] = useState(false);

// This function flips the dark mode setting
const toggleDarkMode = () => {
  setIsDarkMode((prev) => !prev);
};

  return (
    <Container
    className={isDarkMode ? "bg-dark text-white min-vh-100" : "bg-light min-vh-100"}
  > 
  {/* Added Toggle Button for shifting to Dark Mode */}
    <div className="py-3 text-end">
      <Button variant={isDarkMode ? "secondary" : "dark"} onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </div>
      <h1 className="text-left mt-4">Student Connect</h1>

      {/* Form for adding a new profile */}
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
            <Button type="submit" variant="primary">
              Add Profile
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Display each profile as a card */}
      <Row className="justify-content-left">
        {people.map((person) => (
          <Col key={person.id} md={6} lg={4} className="mb-3">
            <PersonCard person={person} onDelete={handleDeleteProfile} />
          </Col>
        ))}
      </Row>

      <h2 className="mt-4">Classmates Table View</h2>

      {/* Filtering & Sorting Controls */}
      <Row className="mb-3">
        <Col xs="auto">
          <Form.Label className="me-2"><strong>Search:</strong></Form.Label>
        </Col>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Type to filter..."
            value={searchText}
            onChange={handleFilterChange}
          />
        </Col>
        <Col xs="auto">
          <Form.Label className="me-2"><strong>Sort by:</strong></Form.Label>
        </Col>
        <Col xs="auto">
          <Form.Select value={sortOption} onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="favoriteFood">Favorite Food</option>
            <option value="favoriteColor">Favorite Color</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Rows-per-page dropdown */}
      <Row className="mb-3">
        <Col xs="auto">
          <Form.Label className="me-2"><strong>Records per page:</strong></Form.Label>
        </Col>
        <Col xs="auto">
          <Form.Select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table showing the current page's filtered & sorted profiles */}
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
          {currentPeople.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.favoriteFood}</td>
              <td>{person.favoriteColor}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(person)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProfile(person.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {currentPeople.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination controls: Previous, Next, and current page info */}
      <Row className="mb-4">
  <Col className="text-end">
    <Button
      variant="secondary"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button>

    <span className="mx-3">
      Page {currentPage} of {totalPages || 1}
    </span>

    <Button
      variant="secondary"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages || totalPages === 0}
    >
      Next
    </Button>
  </Col>
</Row>


      {/* Modal for editing a profile */}
      <Modal show={showEditModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Favorite Food</Form.Label>
              <Form.Control
                type="text"
                name="favoriteFood"
                value={editFormData.favoriteFood}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Favorite Color</Form.Label>
              <Form.Control
                type="text"
                name="favoriteColor"
                value={editFormData.favoriteColor}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default App;
