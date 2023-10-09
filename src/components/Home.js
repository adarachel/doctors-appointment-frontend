import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { getDoctors } from '../redux/doctors/doctorsSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  console.log(doctors);
  useEffect(() => {
    console.log('loading home');
    dispatch(getDoctors());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        <h2>Oopps somethings went wrong.PLease try again!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="Home-container">
      {isMobile ? (
        <div>
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-info">
              <Link to={`/doctor/${doctor.id}`} className="link">
                <img className="photo" src={doctor.profile_pic} alt={doctor.name} />
                <h2>{doctor.name}</h2>
                <p>{doctor.specialization}</p>
                <p>{doctor.bio}</p>
                <p>
                  Buy one hour of time with only $
                  {doctor.consultation_fee}
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
                <img className="photo" src={doctor.profile_pic} alt={doctor.name} />
                <h2>{doctor.name}</h2>
                <p>{doctor.specialization}</p>
                <p>{doctor.bio}</p>
                <p>
                  Buy one hour of time with only $
                  {doctor.consultation_fee}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Home;
