import React from 'react';
import DoctorForm from './AddDoctorForm/DoctorForm';
import './AddDoctorForm/doctor.css';

const AddDcotor = () => (
  <div className="add-doctor-container">
    <h1 className="head-d">Add a new Doctor</h1>
    <DoctorForm />
  </div>
);

export default AddDcotor;
