import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

const Private = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    }
  }, [token, navigate]);

  // Render the wrapped components for authenticated users
  return <>{children}</>;
};

// Add prop validation for the children prop
Private.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Private;
