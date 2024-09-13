import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormPage from "./components/FormPage";
import DataTable from "./components/DataTable";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar to navigate between pages */}
        <Navbar />
        <Routes>
          {/* Home page where data will be rendered */}
          <Route path="/" element={<DataTable />} />
          {/* Form page where user submits the invoice */}
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
