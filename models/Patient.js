const mongoose = require("mongoose");  //Import mongoose which interact with MongoDB
const schema = mongoose.Schema; //Assigns mongoose.Schema constructor

const patientSchema = new schema ({      //Defines the patient schema
  
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  civilStatus: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  medicalStatus: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  emergencyPhone: {
    type: Number,
    required: true,
  },
  gaurdianName: {
    type: String,
    required: false,
  },
  gaurdianPhone: {
    type: Number,
    required: false,
  },
  gaurdianNIC: {
    type: String,
    required: false,
  },
  insuranceNo: {
    type: String,
    required: false,
  },
  insuranceCompany: {
    type: String,
    required: false,
  },
  
});

const Patient = mongoose.model("Patient", patientSchema);  //Creates a mongoose model

module.exports = Patient;  //Export the model
