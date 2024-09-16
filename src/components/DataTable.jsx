import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import * as XLSX from "xlsx"; // Import XLSX for exporting to Excel
import emptyImage from "../images/empty-image.jpg";
import "../style/DataTable.css";

function DataTable() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("invoice_data.xlsx"); // State for file name

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("formData");

    if (storedData) {
      // Parse JSON data
      const jsonData = JSON.parse(storedData);
      setData(jsonData);
    }
  }, []);

  // Function to export data to Excel
  const exportToExcel = () => {
    if (data.length === 0) {
      toast.error("No data available to export!");
      return;
    }

    // Create a worksheet with the data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Data");

    // Trigger file download with the specified file name
    XLSX.writeFile(workbook, fileName);

    toast.success("Excel file downloaded successfully!");
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    // Optionally update localStorage
    localStorage.setItem("formData", JSON.stringify(newData));
    toast.success("Row deleted successfully!");
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
                  <button type="button" onClick={() => deleteRow(index)}>
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

      {/* Download Excel button */}
      <div className="form-row-buttons-dt">
        <button type="button" onClick={exportToExcel}>
          Download Excel File
        </button>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default DataTable;
