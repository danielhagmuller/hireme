import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Home from './Home';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router basename="/">
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
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
  
  return user ? children : <Navigate to="/login" />;
}

export default App;
