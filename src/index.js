// This file serves as the main entry point for our React application.
// It grabs the "root" element from our HTML and renders the App component inside it.

import React from "react";
import ReactDOM from "react-dom/client"; // React 18 introduced createRoot instead of the old render method
import App from "./App";                 // The core App component of our project
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap's base CSS for styling

// We select the 'root' element from the index.html and create a React root there.
const root = ReactDOM.createRoot(document.getElementById("root"));

// StrictMode helps detect potential issues in our code by activating additional checks.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
