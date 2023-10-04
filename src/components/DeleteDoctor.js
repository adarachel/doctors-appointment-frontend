import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, getDoctors } from '../redux/doctors/doctorsSlice';
import './componentsCss/deleteDoctor.css';

const DeleteDoctor = () => {
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const handleDeleteDoctor = (doctorId) => {
    dispatch(deleteDoctor(doctorId));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oopps somethings went wrong.PLease try again!</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="delete-doctor">
      {doctors.map((doctor) => (
        <div className="deldoc-info" key={doctor.id}>
          <img className="photo" src={doctor.photo} alt={doctor.name} />
          <h2 className="deldoc-name">{doctor.name}</h2>
          <button type="button" className="delete-btn" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteDoctor;
