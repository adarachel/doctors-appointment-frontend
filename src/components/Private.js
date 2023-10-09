import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Private = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token  = localStorage.getItem('jwtToken')
  const navigate = useNavigate();
  if (!isAuthenticated || !token ) {
    // Redirect to the login page if not authenticated
    return navigate('/login');
  }

  // Render the wrapped components for authenticated users
  return <>{children}</>;
};

export default Private;
