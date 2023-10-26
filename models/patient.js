const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Name is required"],
    trim: true,
  },
  dob: {
    type: Date,
    // required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: [true, "Gender is required"],
  },
  contact: {
    type: String,
    // required: [true, "Contact number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
  },
  email: {
    type: String,
    // required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  insurance: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
