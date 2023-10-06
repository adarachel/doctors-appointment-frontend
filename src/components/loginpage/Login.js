import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../redux/users/userSlice';

import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data object with the user inputs
    const data = {
      user: {
        login: loginData.login,
        password: loginData.password,
        admin_key: loginData.admin_key,
      },
    };

    try {
      await dispatch(loginUser(data));
      console.log('Before navigation');
      navigate('/home');
      console.log('After navigation');
    } catch (error) {
      // Handle login error here
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <lord-icon
            src="https://cdn.lordicon.com/ljvjsnvh.json"
            trigger="loop"
            delay="1000"
            colors="primary:#16c72e,secondary:#242424"
            state="morph"
            style={{ width: '180px', height: '180px' }}
          />
          <input
            type="text"
            value={loginData.login}
            onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
            placeholder="Username or Email"
          />
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            placeholder="Password"
          />
          <input
            type="text"
            value={loginData.admin_key}
            onChange={(e) => setLoginData({ ...loginData, admin_key: e.target.value })}
            placeholder="Admin Key"
          />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don&apos;t have an account?
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
