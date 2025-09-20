import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from './supabaseClient';

const EmailConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (type === 'signup' && token_hash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'signup'
          });

          if (error) {
            throw error;
          }

          // Email confirmed successfully, redirect to dashboard
          navigate('/dashboard');
        } else {
          // Invalid confirmation link
          setError('Invalid confirmation link');
        }
      } catch (error) {
        console.error('Email confirmation error:', error);
        setError(error.message || 'Failed to confirm email');
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Confirming your email...</h2>
          <p>Please wait while we confirm your email address.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Email Confirmation Failed</h2>
          <div className="error-message">{error}</div>
          <p>Please try signing up again or contact support if the problem persists.</p>
          <button onClick={() => navigate('/signup')}>Back to Sign Up</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Email Confirmed!</h2>
        <p>Your email has been confirmed successfully. Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default EmailConfirmation;