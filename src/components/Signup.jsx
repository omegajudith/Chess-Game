import  { useState } from 'react';
import PropTypes from 'prop-types';

const Signup = ({ onSignup, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(username, password);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button className="switch-btn" onClick={onSwitch}>
          Log In
        </button>
      </p>
    </div>
  );
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default Signup;
