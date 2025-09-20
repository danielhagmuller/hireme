import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Hire Me - Automated Job Application Generator</h1>
        <p className="subtitle">Create custom job applications tailored to specific positions</p>
      </header>
      
      <main className="home-main">
        <div className="features-section">
          <div className="feature-card">
            <h3>Skill Profile Creation</h3>
            <p>Pull data from LinkedIn, GitHub, and custom inputs to create a comprehensive skill profile.</p>
          </div>
          
          <div className="feature-card">
            <h3>Job Advertisement Processing</h3>
            <p>Submit job links to automatically extract requirements and key information.</p>
          </div>
          
          <div className="feature-card">
            <h3>Custom Application Generation</h3>
            <p>Generate professional, tailored job applications that match your skills with job requirements.</p>
          </div>
        </div>
        
        <div className="cta-section">
          <Link to="/signup" className="cta-button">Get Started</Link>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </main>
      
      <footer className="home-footer">
        <p>© 2023 Hire Me - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;