import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import {
  FaTwitter, FaFacebookF, FaVine, FaPinterestP,
  FaBars, FaTimes,
} from 'react-icons/fa';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { logout } from '../redux/users/userSlice';
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
    dispatch(logout());
    localStorage.removeItem('username');
    window.location.href = '/home';
  };

  return (
    <>
      {' '}
      <button className="nav_btn" type="button" onClick={showNavbar}>
        <FaBars />
      </button>
      <div ref={navRef} className="sidebar_container_items">
        <div className="sidebar_container flex">
          <button className="nav_btn nav_btn_close" type="button" onClick={showNavbar}>
            <FaTimes />
          </button>
          <div className="sidebar_container-uperhead flex">
            <div className="sidebar_container-logo"><img src={logo} alt="logo" /></div>
            <div className="sidebar_container-list">
              <ul className="sidebar_list">
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('home')}
                    className={activeNav === 'home' ? 'active' : ''}
                    to="/home"
                  >
                    Doctor
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('reserveform')}
                    className={activeNav === 'reserveform' ? 'active' : ''}
                    to="/reserveform"
                  >
                    Reserve
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('myreservations')}
                    className={activeNav === 'myreservations' ? 'active' : ''}
                    to="/myreservations"
                  >
                    Reservations
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('adddoctor')}
                    className={activeNav === 'adddoctor' ? 'active' : ''}
                    to="/adddoctor"
                  >
                    Add Doctor
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    onClick={() => setActiveNav('delete')}
                    className={activeNav === 'delete' ? 'active' : ''}
                    to="/delete"
                  >
                    Del Doctor
                  </Link>
                </li>

                <li
                  className="sidebar-link"
                  style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/hcuxerst.json"
                    trigger="hover"
                    colors="primary:#16c72e,secondary:#242424"
                    style={{ width: '60px', height: '60px' }}
                    onClick={handleLogout}
                  />
                  logout
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
