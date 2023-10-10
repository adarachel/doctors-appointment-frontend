import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { getReservations } from '../redux/reservations/reservationsSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import './reservation.css';

const Reservations = () => {
  const { reservations, isLoading, error } = useSelector(
    (store) => store.reservations,
  );
  const dispatch = useDispatch();
  console.log(reservations);
  useEffect(() => {
    dispatch(getReservations());
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
            <div className="reservation-imag flex">
              <img
                className="photo"
                src={reservation.photo}
                alt={reservation.doctor_name}
              />
              <h2 className="text-center">
                Dr.
                {reservation.doctor_name}
              </h2>
            </div>
            <div className="reserve-details">
              <p>
                <strong>Address:&ensp;</strong>
                {reservation.city}
              </p>
              <p>
                <strong>Date:&ensp;</strong>
                {reservation.appointment_date}
              </p>
              <p>
                <strong>Time:&ensp;</strong>
                {new Date(reservation.appointment_duration).getHours()}
                :
                {new Date(reservation.appointment_duration).getMinutes()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Reservations;
