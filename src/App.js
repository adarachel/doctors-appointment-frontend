// App.js
import React from 'react';
import {
  BrowserRouter, Routes, Route, useLocation,
} from 'react-router-dom';
import Login from './components/loginpage/Login';
import Signup from './components/signupPage/Signup';
import DeleteDoctor from './components/DeleteDoctor';
import AddDoctor from './components/AddDoctor';
import Private from './components/Private';
import Reservations from './components/Reservations';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Reserve from './components/Reserve';
import DoctorDetails from './components/DoctorDetails';
import './App.css';

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const renderSidebar = !isLoginPage && !isSignupPage;

  return (
    <>
      {renderSidebar && <Sidebar />}
      <Routes>
        <Route index element={<Private><Home /></Private>} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/home" element={<Private><Home /></Private>} />
        <Route path="/add_doctor" element={<Private><AddDoctor /></Private>} />
        <Route path="/delete" element={<Private><DeleteDoctor /></Private>} />
        <Route path="/doctor/:doctorId" element={<Private><DoctorDetails /></Private>} />

        <Route path="reserveform" element={<Private><Reserve /></Private>} />
        <Route path="myreservations" element={<Private><Reservations /></Private>} />
      </Routes>
    </>
  );
};

export default App;
