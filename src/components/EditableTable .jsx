import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import emptyImage from "../images/empty-image.jpg";
import "../style/EditableTable.css"; // Importing custom CSS

const EditableTable = () => {
  // Load initial data from localStorage or default to an empty array
  const initialData = JSON.parse(localStorage.getItem("tableData")) || [];

  const [tableData, setTableData] = useState(initialData);
  const [editIdx, setEditIdx] = useState(-1); // Index of the row being edited

  const inputRefs = useRef([]); // To store references to input fields

  // Handle input change for editable fields
  const handleInputChange = (e, index, field) => {
    const newData = [...tableData];
    newData[index][field] = e.target.value;
    setTableData(newData);
  };

  // Save the edited row
  const saveRow = () => {
    setEditIdx(-1); // Exit edit mode
    toast.success("Row has been saved successfully!", {
      position: "top-right",
      autoClose: 2000, // Automatically close after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Edit a specific row
  const editRow = (index) => {
    setEditIdx(index);
  };

  // Add a new empty row to the table
  const addRow = () => {
    setTableData([...tableData, { description: "", lineAmount: "" }]);
    setEditIdx(tableData.length); // Edit the newly added row
  };

  // Delete a row from the table
  const deleteRow = (index) => {
    const newData = tableData.filter((_, idx) => idx !== index); // Remove the selected row
    setTableData(newData);
    toast.error("Row has been deleted!", {
      position: "top-right",
      autoClose: 2000, // Automatically close after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Automatically save table data to localStorage whenever tableData changes
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  // Adjust the width of the input dynamically
  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.style.width = `${input.scrollWidth}px`;
      }
    });
  }, [tableData, editIdx]);

  return (
    <div className="editable-table-container">
      <ToastContainer /> {/* Toast notification container */}
      {tableData.length > 0 ? (
        <table
          className="editable-table"
          border="1"
          cellPadding="10"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th className="description-column">Description</th>
              <th className="line-amount-column">Line Amount</th>
              <th className="action-column">Action</th>
              <th className="delete-column">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="description-column">
                  {editIdx === index ? (
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleInputChange(e, index, "description")
                      }
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ) : (
                    <span className="cell-content">{row.description}</span>
                  )}
                </td>
                <td className="line-amount-column">
                  {editIdx === index ? (
                    <input
                      type="number"
                      value={row.lineAmount}
                      onChange={(e) =>
                        handleInputChange(e, index, "lineAmount")
                      }
                      ref={(el) => (inputRefs.current[index + "-amount"] = el)}
                    />
                  ) : (
                    <span className="cell-content">{row.lineAmount}</span>
                  )}
                </td>
                <td className="action-column">
                  {editIdx === index ? (
                    <button className="save-button" onClick={saveRow}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => editRow(index)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="delete-column">
                  <button
                    className="delete-button"
                    onClick={() => deleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data-container">
          <p className="no-data-message">
            We didn't find any data to show at this time.
          </p>
          <div className="empty-image">
            <img src={emptyImage} alt="No data found" />
          </div>
        </div>
      )}
      <button type="button" className="add-row-button" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
};

export default EditableTable;
