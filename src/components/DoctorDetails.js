import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctor } from '../redux/doctors/doctorsSlice';
import './componentsCSS/details.css';

const DoctorDetails = () => {
  const dispatch = useDispatch();
  const { doctorId } = useParams();

  useEffect(() => {
    dispatch(getDoctor(doctorId));
  }, [dispatch, doctorId]);

  const doctor = useSelector((state) => state.doctors.doctor);
  return (
    <section className="doctor-container">
      <div className="img-div">
        <img
          className="doctor-image"
          src={doctor.profile_pic}
          alt={doctor.name}
        />
      </div>
      <div className="doctor-de">
        <h2 className="d-name">{doctor.name}</h2>

        <ul className="d-ul">
          <li className="d-li">
            Consultation Fee/Hour: $
            {doctor.consultation_fee}
          </li>
          <li className="d-li">
            Bio:
            {doctor.bio}
          </li>
        </ul>
        <button type="button" className="reserve-button">
          <Link to="/appointment_form" className="reserve-button">
            Reserve
          </Link>
        </button>
      </div>
    </section>
  );
};

export default DoctorDetails;
