import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const Private = ({ children }) => {
  const savedUsername = localStorage.getItem('username');

  if (savedUsername) {
    return children;
  }
  return <Navigate to="/login" />;
};

Private.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Private;
