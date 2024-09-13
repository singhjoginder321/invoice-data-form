import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./../style/FormPage.css";

function FormPage() {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    vendorName: "",
    invoiceDate: "",
    subTotal: "",
    invoiceAmount: "",
  });

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

        {/* Submit button */}
        <div className="form-row-buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default FormPage;
