const formSections = {
  "User Information": [
    { name: "firstName", type: "text", label: "First Name", required: true },
    { name: "lastName", type: "text", label: "Last Name", required: true },
    { name: "age", type: "number", label: "Age", required: false },
  ],
  "Address Information": [
    { name: "street", type: "text", label: "Street", required: true },
    { name: "city", type: "text", label: "City", required: true },
    {
      name: "state",
      type: "dropdown",
      label: "State",
      options: ["California", "Texas", "New York"],
      required: true,
    },
    { name: "zipCode", type: "text", label: "Zip Code", required: false },
  ],
  "Payment Information": [
    {
      name: "cardNumber",
      type: "text",
      label: "Card Number",
      required: true,
    },
    {
      name: "expiryDate",
      type: "date",
      label: "Expiry Date",
      required: true,
    },
    { name: "cvv", type: "password", label: "CVV", required: true },
    {
      name: "cardholderName",
      type: "text",
      label: "Cardholder Name",
      required: true,
    },
  ],
  "Job Application": [
    { name: "fullName", type: "text", label: "Full Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    {
      name: "phoneNumber",
      type: "tel",
      label: "Phone Number",
      required: true,
    },
    { name: "resume", type: "file", label: "Upload Resume", required: true },
  ],
  Feedback: [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: false },
    { name: "rating", type: "number", label: "Rating (1-5)", required: true },
    {
      name: "comments",
      type: "textarea",
      label: "Comments",
      required: false,
    },
  ],
  "Event Registration": [
    { name: "eventName", type: "text", label: "Event Name", required: true },
    {
      name: "participantName",
      type: "text",
      label: "Participant Name",
      required: true,
    },
    { name: "email", type: "email", label: "Email", required: true },
    {
      name: "attendanceType",
      type: "dropdown",
      label: "Attendance Type",
      options: ["Online", "In-person"],
      required: true,
    },
  ],
  "Medical History": [
    {
      name: "patientName",
      type: "text",
      label: "Patient Name",
      required: true,
    },
    { name: "age", type: "number", label: "Age", required: true },
    {
      name: "gender",
      type: "dropdown",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      name: "allergies",
      type: "textarea",
      label: "Known Allergies",
      required: false,
    },
    {
      name: "medicalConditions",
      type: "textarea",
      label: "Medical Conditions",
      required: false,
    },
  ],
};

export default formSections;
