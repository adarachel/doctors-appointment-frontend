import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { signupUser } from '../../redux/users/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.user.pending);
  const error = useSelector((state) => state.user.error);
  const [name, setname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled and password matches confirm password
    if (name && username && email && password && password === confirmPassword) {
      dispatch(
        signupUser({
          user: {
            name,
            username,
            email,
            password,
          },
        }),
      );
      navigate('/login');
    } else if (!password === confirmPassword) {
      alert('Password and Confirm Password do not match.');
    } else {
      alert('Please fill in all fields');
    }

    // Clear the form fields
    setname('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if (isloading === true) {
    return (
      <div className="custom-loader">
        .
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Full Name"
            required
          />

          {/* Username */}
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          {/* Email */}
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* Password */}
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          {error && <p>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
