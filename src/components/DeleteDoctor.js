import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { deleteDoctor, getDoctors } from '../redux/doctors/doctorsSlice';
import './componentsCSS/deleteDoctor.css';

const DeleteDoctor = () => {
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const handleDeleteDoctor = (doctorId) => {
    dispatch(deleteDoctor(doctorId));
  };

  const empty = () => {
    if (doctors.length === 0) {
      return <h3 className="center"> 🥺 Doctors not available.</h3>;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="log-load">
        <FaSpinner className="spinner" />
        <div className="loading"> 🛸 Loading.......</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>
          {' '}
          ⚠️ Oops! somethings went wrong.
          {' '}
          <br />
          {' '}
          Please try again!
        </h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="delete-doctor">
      {empty()}
      {doctors.map((doctor) => (
        <div className="deldoc-info" key={doctor.id}>
          <img className="photo" src={doctor.profile_pic} alt={doctor.name} />
          <h2 className="deldoc-name">{doctor.name}</h2>
          <button
            type="button"
            className="delete-btn"
            onClick={() => handleDeleteDoctor(doctor.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeleteDoctor;
