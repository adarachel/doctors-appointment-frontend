import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import {
  FaTwitter,
  FaFacebookF,
  FaVine,
  FaPinterestP,
  FaTimes,
} from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { logoutUser } from '../redux/users/userSlice';
import logo from './assets/logo.png';
import './sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeNav, setActiveNav] = useState('/');
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {' '}
      <button className="nav_btn" type="button" onClick={showNavbar}>
        <VscThreeBars className="bar" />
      </button>
      <div ref={navRef} className="sidebar_container_items">
        <div className="sidebar_container flex">
          <button
            className="nav_btn nav_btn_close"
            type="button"
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
          <div className="sidebar_container-uperhead flex">
            <div className="sidebar_container-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="sidebar_container-list">
              <ul className="sidebar_list">
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('home')}
                    className={activeNav === 'home' ? 'active' : ''}
                    to="/home"
                  >
                    Doctors
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('reserveform')}
                    className={activeNav === 'reserveform' ? 'active' : ''}
                    to="/appointment_form"
                  >
                    New Appointment
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('myreservations')}
                    className={activeNav === 'myreservations' ? 'active' : ''}
                    to="/appointments"
                  >
                    Appointments
                  </Link>
                </li>
                {localStorage.getItem('admin') === 'true' && (
                  <li className="sidebar-link">
                    <Link
                      onClick={() => setActiveNav('adddoctor')}
                      className={activeNav === 'adddoctor' ? 'active' : ''}
                      to="/add_doctor"
                    >
                      Add Doctor
                    </Link>
                  </li>
                )}

                {localStorage.getItem('admin') === 'true' && (
                  <li className="sidebar-link">
                    <Link
                      onClick={() => setActiveNav('delete')}
                      className={activeNav === 'delete' ? 'active' : ''}
                      to="/delete"
                    >
                      Del Doctor
                    </Link>
                  </li>
                )}

                <li className="sidebar-link">
                  <button
                    type="submit"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidbar_footer flex ">
            <div className="sidebar_socials flex">
              <FaTwitter />
              <FaFacebookF />
              <TiSocialGooglePlus />
              <FaVine />
              <FaPinterestP />
            </div>
            <small>&copy; 2023 APPOINTMENT</small>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
