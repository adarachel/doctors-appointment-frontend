import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReserve } from '../redux/reservations/reservationSlice';
import { getDoctors } from '../redux/doctors/doctorsSlice';
import './componentsCSS/reserve.css';

const Reservation = () => {
  const doctors = useSelector((state) => state.doctors.doctors);
  const user = localStorage.getItem('username');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const [reserve, setReserve] = useState({
    username: user?.user || null,
    date: '',
    time: '',
    doctor: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserve((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const {
      date, time, doctor, city,
    } = reserve;

    if (!date || !time || !doctor || !city) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      // Dispatch the createReserve action to make the reservation request
      await dispatch(createReserve(reserve));
      alert('Reservation created successfully!');
      navigate('/myreservations'); // Redirect to the reservation page after successful reservation
    } catch (error) {
      alert('Error occurred while making a reservation.');
    }
  };

  return (
    <div className="container-2">
      <h1 className="heading">Book an Appointment for a Doctor</h1>
      <form onSubmit={submit}>
        <h2>Make a reservation with us</h2>
        <input
          type="city"
          name="city"
          value={reserve.city}
          onChange={handleInputChange}
          placeholder="city"
        />
        <input
          type="date"
          name="date"
          value={reserve.date}
          onChange={handleInputChange}
          placeholder="Date"
        />

        <input
          type="time"
          name="time"
          value={reserve.time}
          onChange={handleInputChange}
          placeholder="Time Duration"
        />

        <div className="select-container">
          <select
            name="doctor"
            value={reserve.doctor}
            onChange={handleInputChange}
            placeholder="Select a doctor"
            className="select-option"
          >
            <option value="" className="option-item">
              Select a doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="r-btn">
          <button type="submit" className="rebtn">
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
