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
    <div className="details">
      <div className="doctor-container">
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
              Consultation Fee/Hour:
              <span className="data">
                {' '}
                $
                {doctor.consultation_fee}
              </span>
            </li>
            <li className="d-li">
              Bio:
              {' '}
              <span className="data">{doctor.bio}</span>
            </li>
          </ul>
          <button type="button" className="reserve-button">
            <Link to="/appointment_form" className="reserve-button">
              Reserve
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
