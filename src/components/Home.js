import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaSpinner } from 'react-icons/fa';
import { Pagination, Navigation } from 'swiper/modules';
import { getDoctors } from '../redux/doctors/doctorsSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const {
    doctors = [],
    isLoading,
    error,
  } = useSelector((store) => store.doctors);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    dispatch(getDoctors());
    handleResize();

    if (localStorage.getItem('load') === 'false') {
      dispatch(getDoctors());
      window.location.reload();

      localStorage.setItem('load', 'true');
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

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
    <div className="home">
      <h1 className="head"> Doctors with us 👕</h1>
      <div className="Home-container">
        {isMobile ? (
          <div>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-info">
                <Link to={`/doctor/${doctor.id}`} className="link">
                  <img
                    className="photo"
                    src={doctor.profile_pic}
                    alt={doctor.name}
                  />
                  <h2>{doctor.name}</h2>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="doctor-about">{doctor.bio}</p>
                  <p className="fees">
                    Buy one hour of time with only
                    {' '}
                    <span className="price">
                      {' '}
                      $
                      {doctor.consultation_fee}
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            navigation
            slidesPerView={3}
            spaceBetween={60}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {doctors.map((doctor) => (
              <SwiperSlide className="doctor-info" key={doctor.id}>
                <Link to={`/doctor/${doctor.id}`} className="link">
                  <img
                    className="photo"
                    src={doctor.profile_pic}
                    alt={doctor.name}
                  />
                  <h2>{doctor.name}</h2>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="doctor-about">{doctor.bio}</p>
                  <p className="fees">
                    Buy one hour of time with only
                    <span className="price">
                      {' '}
                      $
                      {doctor.consultation_fee}
                    </span>
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Home;
