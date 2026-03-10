import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Heart, Loader2, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../styles/login.css';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              blood_group: bloodGroup,
            },
          },
        });
        if (authError) throw authError;
        setMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during authentication.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{
      marginTop: "48px"
    }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card auth-card"
      >
        <div className="auth-header">
          <div className="auth-logo-icon">
            <Heart size={32} />
          </div>
          <h2 className="auth-title">Join LifeLink</h2>
          <p className="auth-subtitle">Together we can save more lives</p>
        </div>

        <div className="auth-body">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setError(null); setMessage(null); }}
            >
              <LogIn size={16} /> Login
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setError(null); setMessage(null); }}
            >
              <UserPlus size={16} /> Signup
            </button>
          </div>

          <form onSubmit={handleAuth}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="auth-form-enter"
                  style={{ marginBottom: '16px' }}
                >
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <User className="form-icon" />
                    <input 
                      type="text" 
                      placeholder="Gujjula Ravithreni" 
                      className="form-control" 
                      required={!isLogin} 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Blood Group</label>
                    <Heart className="form-icon" />
                    <select 
                      className="form-control form-select" 
                      required={!isLogin} 
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label className="form-label">Email</label>
              <Mail className="form-icon" />
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="form-control" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Password</label>
              <Lock className="form-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="form-control" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginTop: '16px', padding: '12px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success" style={{ marginTop: '16px', padding: '12px', fontSize: '14px' }}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary btn-full"
              style={{ marginTop: '24px' }}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <p className="auth-footer">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="auth-link"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
