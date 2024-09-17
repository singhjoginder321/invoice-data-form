import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import emptyImage from "../images/empty-image.jpg";
import "../style/DataTable.css";

function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("formData");

    if (storedData) {
      // Parse JSON data
      const jsonData = JSON.parse(storedData);
      setData(jsonData);
    }
  }, []);

  // Function to delete a row
  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    // Optionally update localStorage
    localStorage.setItem("formData", JSON.stringify(newData));
    toast.success("Row deleted successfully!", {
      position: "top-right",
      autoClose: 2000, // Automatically close after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Invoice Amount</th>
            <th>Invoice Date</th>
            <th>Sub Total</th>
            <th>Vendor Name</th>
            <th>Actions</th> {/* Add an Actions column */}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                We didn't find any data to show at this time
              </td>
            </tr>
          ) : (
            data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.invoiceNumber}</td>
                <td>{entry.invoiceAmount}</td>
                <td>{entry.invoiceDate}</td>
                <td>{entry.subTotal}</td>
                <td>{entry.vendorName}</td>
                <td>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="empty-image">
          <img src={emptyImage} alt="No data found" />
        </div>
      )}

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default DataTable;
