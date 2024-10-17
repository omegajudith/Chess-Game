import { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password); // Call the login handler from parent
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Log In</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button className="switch-btn" onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default Login;
