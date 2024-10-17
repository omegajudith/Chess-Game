import { useState } from 'react';
import Board from './components/Board';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/ChessBoard.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const handleSignup = (username, password) => {
    if (users.find(user => user.username === username)) {
      alert('Username already exists. Please choose another one.');
    } else {
      setUsers([...users, { username, password }]);
      setIsSignup(false); // Move to login after successful signup
      alert('Signup successful! You can now log in.');
    }
  };

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setUsername(username);
      setLoggedIn(true);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <h1>Welcome, {username}! Enjoy the Chess Game!</h1>
          <Board />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {isSignup ? (
            <Signup onSignup={handleSignup} onSwitch={() => setIsSignup(false)} />
          ) : (
            <Login onLogin={handleLogin} onSwitch={() => setIsSignup(true)} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
