import React, { useEffect, useState } from "react";
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
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
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
    </div>
  );
}

export default DataTable;
