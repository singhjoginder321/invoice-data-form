import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import * as XLSX from "xlsx";
import "./../style/FormPage.css";

function FormPage() {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    vendorName: "",
    invoiceDate: "",
    subTotal: "",
    invoiceAmount: "",
  });

  const [fileName, setFileName] = useState("invoice_data.xlsx"); // State for file name

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to store form data in localStorage
  const storeFormData = (newData) => {
    try {
      // Get the existing data from localStorage, if any
      let existingData = JSON.parse(localStorage.getItem("formData")) || [];

      // Append the new form data to the existing data
      existingData.push(newData);

      // Save the updated data back to localStorage
      localStorage.setItem("formData", JSON.stringify(existingData));
    } catch (error) {
      console.error("Error storing form data:", error);
    }
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    // Get all the form data from localStorage
    const dataToExport = JSON.parse(localStorage.getItem("formData")) || [];

    if (dataToExport.length === 0) {
      toast.error("No data available to export!");
      return;
    }

    // Create a worksheet with the data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Data");

    // Trigger file download with the specified file name
    XLSX.writeFile(workbook, fileName);

    toast.success("Excel file downloaded successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store form data in localStorage
    storeFormData(formData);

    // Clear form fields after submission
    setFormData({
      invoiceNumber: "",
      vendorName: "",
      invoiceDate: "",
      subTotal: "",
      invoiceAmount: "",
    });

    toast.success("Form data has been saved!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="invoice-form">
        <div className="form-row">
          <label>
            * Invoice Number
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Vendor Name
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />
          </label>

          <label>
            Invoice Date
            <input
              type="text"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Sub Total
            <input
              type="text"
              name="subTotal"
              value={formData.subTotal}
              onChange={handleChange}
            />
          </label>

          <label>
            Invoice Amount
            <input
              type="text"
              name="invoiceAmount"
              value={formData.invoiceAmount}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Input for file name */}
        <div className="form-row">
          <label>
            Excel File Name
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name (e.g., invoice_data.xlsx)"
            />
          </label>
        </div>

        {/* Buttons row */}
        <div className="form-row-buttons">
          <button type="button" onClick={exportToExcel}>
            Download Excel File
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default FormPage;
