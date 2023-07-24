import React, { useEffect } from 'react';

const Logout = () => {

  useEffect(() => {
    // Clear the authentication token from local storage
    localStorage.removeItem('currentUserToken');
    // Redirect to the login page after logout
    window.location.href = "/login";
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
