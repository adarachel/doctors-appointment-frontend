import React, { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getReserve } from '../redux/reservations/reservationsSlice';
import { getDoctors } from '../redux/doctors/doctorsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reservation.css';

const Reservations = () => {
  const { reservations, isLoading, error } = useSelector(
    (store) => store.reservations,
  );
  const redoctors = useSelector((store) => store.doctors.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReserve());
    dispatch(getDoctors());
  }, [dispatch]);

  const empty = () => {
    if (reservations.length === 0) {
      return <h3 className=""> 🥺 No Appointment Yet.</h3>;
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
          ⚠️ Oops! Something went wrong.
          <br />
          {' '}
          Please try again!
        </h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <h1 className="reserve-title">Appointments</h1>
      {empty()}
      <div className="card-container">
        {reservations.map((reservation) => (
          <div className="card" key={reservation.id}>
            {redoctors
              .filter((value) => value.id === reservation.doctor_id)
              .map((doctor) => (
                <div className="reservation-imag" key={doctor.id}>
                  <img
                    className="photo"
                    src={doctor.profile_pic}
                    alt={doctor.name}
                  />
                  <h2 className="text-center">
                    Dr.
                    {doctor.name}
                  </h2>
                </div>
              ))}
            <div className="reserve-details">
              <p>
                <strong>Address:&ensp;</strong>
                {reservation.city}
              </p>
              <p>
                <strong>Date:&ensp;</strong>
                {reservation.appointment_date.split('T')[0]}
              </p>
              <p>
                <strong>Time:&ensp;</strong>
                {reservation.appointment_duration}
                {' '}
                hours
              </p>
              <p>
                <strong>Facility Fee:&ensp;</strong>
                $
                {reservation.facility_fee}
              </p>
              {redoctors
                .filter((value) => value.id === reservation.doctor_id)
                .map((doctor) => (
                  <div key={doctor.id}>
                    <p>
                      <strong>Consultation Fee/Hour:&ensp;</strong>
                      $
                      {doctor.consultation_fee}
                    </p>
                    <p>
                      <strong>Total Reservation Fee:&ensp;</strong>
                      $
                      {doctor.consultation_fee
                        * reservation.appointment_duration
                        + parseFloat(reservation.facility_fee)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
