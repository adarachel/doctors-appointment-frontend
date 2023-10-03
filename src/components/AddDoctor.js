import React from 'react';
import DoctorForm from './addDoctorForm/DoctorForm.js';
import './addDoctorForm/doctor.css';

const AddDcotor = () => (
  <div className="add-doctor-container">
    <h1>Add a new Doctor</h1>
    <DoctorForm />
  </div>
);

export default AddDcotor;
