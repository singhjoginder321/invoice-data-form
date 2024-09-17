import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DataTable from "./components/DataTable";
import EditableTable from "./components/EditableTable ";
import FormPage from "./components/FormPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar to navigate between pages */}
        <Header />
        <div className="main-section">
          <Navbar />
          <Routes>
            {/* Home page where data will be rendered */}
            <Route path="/" element={<DataTable />} />
            {/* Form page where user submits the invoice */}
            <Route path="/form" element={<FormPage />} />
            <Route path="/edit-table" element={<EditableTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
