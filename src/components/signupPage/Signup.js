import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signupUser } from '../../redux/users/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && fullName) {
      dispatch(signupUser({ username, full_name: fullName }));
      navigate('/login');
    } else {
      alert('Please fill in all fields');
    }
    setUsername('');
    setFullName('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <lord-icon
            src="https://cdn.lordicon.com/ljvjsnvh.json"
            trigger="loop"
            delay="1000"
            colors="primary:#16c72e,secondary:#242424"
            state="morph"
            style={{ width: '150px', height: '150px' }}
          />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
          {error && <p>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
