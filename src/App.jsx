import { useState } from "react";
import Login from "./components/Login";     // Correct path to Login.jsx
import Signup from "./components/Signup";   // Correct path to Signup.jsx
import Board from "./components/Board";     // Correct path to Board.jsx
import './index.css';                       // Assuming your global styles are in index.css

const App = () => {
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setUser({ username });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = (username, password) => {
    if (username && password) {
      setUser({ username });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {!user ? (
        isSigningUp ? (
          <Signup onSignup={handleSignup} onSwitch={() => setIsSigningUp(false)} />
        ) : (
          <Login onLogin={handleLogin} onSwitch={() => setIsSigningUp(true)} />
        )
      ) : (
        <Board user={user} onSignOut={handleLogout} />
      )}
    </div>
  );
};

export default App;
