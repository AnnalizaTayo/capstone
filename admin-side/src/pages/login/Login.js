import React, { useState } from "react";
import axios from "axios";
import './login.scss';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const server = process.env.REACT_APP_SERVER_LINK;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(server+'/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      // Save the token to local storage
      localStorage.setItem("currentUserToken", token);
      console.log(token);

      // Redirect to the dashboard
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div class="auth container">
      <div class="content">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div class="form-group my-1">
                <label for="username">Username:</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div class="form-group my-2">
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit" class="container-fluid btn btn-primary my-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;