import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

const Private = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

Private.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Private;
