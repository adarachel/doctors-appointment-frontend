import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../redux/users/userSlice';

import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userObj = {
        login,
        password,
      };

      if (adminKey) {
        userObj.admin_key = adminKey;
      }
      localStorage.setItem('load', false);
      await dispatch(loginUser({ user: userObj }));

      navigate('/');
    } catch (error) {
      // Handle login failure (you can display an error message)
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
            value={login}
            className="input"
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Username or email"
            required
          />
          <input
            type="password"
            value={password}
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="text"
            value={adminKey}
            className="input"
            onChange={(e) => setAdminKey(e.target.value)}
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
