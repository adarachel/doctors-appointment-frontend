import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { getReserve } from '../redux/reservations/reservationsSlice';
import { getDoctors } from '../redux/doctors/doctorsSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
        <h2>Oops! somethings went wrong.Please try again!</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="reservation-page">
      <h1 className="reserve-title">All the Reservations</h1>
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={60}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          1204: {
            slidesPerView: 3,
          },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {reservations.map((reservation) => (
          <SwiperSlide className="reservation-info flex" key={reservation.id}>
            {redoctors
              .filter((value) => value.id === reservation.doctor_id)
              .map((doctor) => (
                <div className="reservation-imag flex" key={doctor.id}>
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
                minutes
              </p>

              <p>
                <strong>Fees:&ensp;</strong>
                $
                {reservation.facility_fee}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Reservations;
