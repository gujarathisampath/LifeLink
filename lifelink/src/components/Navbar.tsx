import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-icon">
            <Droplets size={24} />
          </div>
          <h2 className="navbar-title">
            Life<span>Link</span>
          </h2>
        </Link>

        <ul className="navbar-links">
          {[
            { name: 'Home', path: '/' },
            { name: 'Find Blood', path: '/find-blood' },
            { name: 'Donate', path: '/donate' },
            { name: 'About', path: '/about' },
          ].map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LogOut size={16} /> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </li>
          )}
        </ul>

        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {[
            { name: 'Home', path: '/' },
            { name: 'Find Blood', path: '/find-blood' },
            { name: 'Donate', path: '/donate' },
            { name: 'About', path: '/about' },
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`navbar-mobile-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <button 
              className="navbar-mobile-link"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              style={{ textAlign: 'left', width: '100%', border: 'none', background: 'none' }}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className={`navbar-mobile-link ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
