import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formSections from "./api/formSeciton"; // Import form sections from an API call

function App() {
  // State variables to manage form type, form fields, submitted data, errors, form data, and edit state
  const [field, setfield] = useState("");
  const [formField, setformField] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(null); // Track which row is being edited

  // Handle changes in the form type dropdown
  const handleChange = async (e) => {
    e.preventDefault();
    setfield(e.target.value);
    setformField(formSections[e.target.value]); // Load the selected form's fields
    setFormData({});
    setErrors({});
    toast.info(`Fill all the required fields from ${e.target.value}`);
  };

  // Handle changes in input fields
  const changeHandler = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields to ensure required fields are filled
  const validateFields = () => {
    let tempErrors = {};
    formField.forEach((field) => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      toast.error("Please fill all required fields!");
    }
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission and update the submitted data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      const updatedData = [...submittedData];

      if (editIndex !== null) {
        // If editing, update the specific row
        updatedData[editIndex.formIndex].data[editIndex.rowIndex] = {
          ...formData,
        };
        setSubmittedData(updatedData);
        setEditIndex(null); // Reset the edit index
        toast.success("Form updated successfully!");
      } else {
        // Handle new submission
        const newSubmission = { formType: field, data: [formData] };
        const existingIndex = submittedData.findIndex(
          (submission) => submission.formType === field
        );

        if (existingIndex >= 0) {
          // Append data to the existing form type
          updatedData[existingIndex].data = [
            ...updatedData[existingIndex].data,
            formData,
          ];
          setSubmittedData(updatedData);
        } else {
          // Add a new form type entry
          setSubmittedData([...submittedData, newSubmission]);
        }

        toast.success("Form submitted successfully!");
      }

      setFormData({});
    }
  };

  // Handle editing of a specific row
  const handleEdit = (formIndex, rowIndex) => {
    const entryToEdit = submittedData[formIndex].data[rowIndex];
    setFormData(entryToEdit); // Prefill the form with the selected data
    setfield(submittedData[formIndex].formType); // Set the form type
    setformField(formSections[submittedData[formIndex].formType]); // Load fields for the form
    setEditIndex({ formIndex, rowIndex }); // Track the editing state
    toast.info("Edit mode activated. Make changes and click submit to update.");
  };

  // Handle deletion of a specific row
  const handleDelete = (formIndex, rowIndex) => {
    const updatedData = [...submittedData];
    updatedData[formIndex].data.splice(rowIndex, 1); // Remove the row

    if (updatedData[formIndex].data.length === 0) {
      // Remove the form type if no data is left
      updatedData.splice(formIndex, 1);
    }

    setSubmittedData(updatedData);
    toast.success("Entry deleted successfully.");
  };

  return (
    <>
      {/* Page layout with header, body (form), and footer */}
      <div className="bg-slate-200 min-h-screen">
        <div className="h-screen flex flex-col justify-between bg-slate-200">
          {/* Header Section */}
          <div>
            <header className="bg-gray-500 text-white p-4 shadow-md">
              <h1 className="text-center text-xl lg:text-3xl font-bold">
                FillEase-Dynamic Form Generator
              </h1>
              <p className="text-center text-sm lg:text-lg italic mt-2">
                Create and submit forms effortlessly!
              </p>
            </header>
          </div>

          {/* Form Section */}
          <div className="w-full flex mt-2 items-center justify-center">
            <ToastContainer position="top-right" autoClose={2000} />
            <div className="lg:w-2/3 bg-white w-[90%] sm:mx-4 text-center py-3 rounded-md shadow-md">
              <span className="text-2xl lg:text-3xl font-bold">
                Form-Fields
              </span>
              <div>
                {/* Form Type Dropdown */}
                <select
                  onChange={handleChange}
                  className="border my-4 px-2 py-1 rounded-lg bg-slate-300 outline-none"
                >
                  <option value="">Please select an option</option>
                  <option value="User Information">User-information</option>
                  <option value="Address Information">Address</option>
                  <option value="Payment Information">
                    Payment information
                  </option>
                  <option value="Job Application">Job Application</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Event Registration">Event Registration</option>
                  <option value="Medical History">Medical History</option>
                </select>
              </div>

              {/* Dynamic Form Fields */}
              {formField.length > 0 && (
                <form
                  onSubmit={handleSubmit}
                  className="w-fit flex items-center flex-col mx-auto"
                >
                  {formField.map((a, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-center justify-center my-2"
                      >
                        <label htmlFor={a.name}>
                          {a.label}
                          {a.required && (
                            <span className="text-red-600">*</span>
                          )}
                          :
                        </label>

                        {a.type === "dropdown" ? (
                          <select
                            id={a.name}
                            className="border w-full px-2 py-1 rounded-lg outline-none my-2"
                            name={a.name}
                            required={a.required}
                            onChange={changeHandler}
                          >
                            <option className="w-full" value="">
                              Select state
                            </option>
                            {a.options.map((b, index) => {
                              return (
                                <option key={index} value={b}>
                                  {b}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <input
                            id={a.name}
                            type={a.type}
                            name={a.name}
                            onChange={changeHandler}
                            value={formData[a.name] || ""}
                            required={a.required}
                            className="border px-2 py-1 rounded-lg outline-none"
                          />
                        )}
                        {errors[a.name] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[a.name]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  <button
                    className="mt-2 bg-blue-400 w-full py-2 rounded-lg hover:bg-blue-500"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Submitted Data Table */}
          <div className="bg-slate-200 my-2 mx-1">
            {submittedData.map((submission, index) => (
              <div key={index} className="mb-8 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-4">
                  {submission.formType}
                </h3>
                {submission.data.length > 0 ? (
                  <table className="w-full table-auto border border-black rounded shadow-md min-w-max">
                    <thead>
                      <tr className="bg-gray-200 border border-black">
                        <th className="p-3 border border-black text-left">#</th>
                        {Object.keys(submission.data[0]).map((key) => (
                          <th
                            key={key}
                            className="p-3 border border-black text-left capitalize"
                          >
                            {key.replace(/([A-Z])/g, " $1")}
                          </th>
                        ))}
                        <th className="p-3 border border-black text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submission.data.map((dataRow, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="bg-gray-100 border border-black "
                        >
                          <td className="p-3 text-left">{rowIndex + 1}</td>
                          {Object.keys(dataRow).map((key) => (
                            <td
                              key={key}
                              className="p-3 border border-black text-left"
                            >
                              {dataRow[key]}
                            </td>
                          ))}
                          <td className="p-3 text-left flex gap-2">
                            <button
                              className="bg-yellow-300 px-3 py-1 rounded-lg text-sm hover:bg-yellow-400"
                              onClick={() => handleEdit(index, rowIndex)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500"
                              onClick={() => handleDelete(index, rowIndex)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600 italic">
                    No data submitted for this form type.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <footer className="bg-gray-400 text-white p-4 text-center mt-4">
            <p>
              © {new Date().getFullYear()} Dynamic Form Generator. All Rights
              Reserved.
            </p>
            <p className="mt-1">Created by Anurag Deshmukh</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
