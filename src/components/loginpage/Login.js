import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../redux/users/userSlice';

import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(username));
      navigate('/home');
    } catch (error) {
      // eslint-disable-next-line no-console
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
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
