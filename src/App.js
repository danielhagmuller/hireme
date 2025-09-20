import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Home from './Home';
import EmailConfirmation from './EmailConfirmation';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router basename="/">
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/confirm-email" element={<EmailConfirmation />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  
  console.log('PrivateRoute: Checking user authentication', user);
  
  return user ? children : <Navigate to="/login" />;
}

export default App;
