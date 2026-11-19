import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authApi } from '../services/api';
import { AuthModal } from './AuthModal';

export const Navbar = ({ solvedCount = 24, totalCount = 150 }) => {
  const location = useLocation();
  const [user, setUser] = useState(authApi.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authApi.getToken()));

  const loadUserProfile = async () => {
    try {
      const data = await authApi.getProfile();
      if (data?.user) {
        setUser(data.user);
        setIsLoggedIn(Boolean(data.authenticated || authApi.getToken()));
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await authApi.logout();
    setIsLoggedIn(false);
    setUser(null);
    loadUserProfile();
  };

  const currentSolved = user?.solved?.total || solvedCount;

  return (
    <>
      <header className="navbar">
        <div className="nav-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/codingx-logo-transparent.png" alt="CodingX Logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/problems" className={`nav-item ${location.pathname.startsWith('/problems') ? 'active' : ''}`}>
            Problems
          </Link>
          <Link to="/contests" className={`nav-item ${location.pathname === '/contests' ? 'active' : ''}`}>
            Contests
          </Link>
          <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="progress-pill">
            <span className="progress-dot" />
            <span>{currentSolved}/{totalCount} Solved</span>
          </div>

          {isLoggedIn && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/profile" className="user-profile-btn">
                <img src="/profile-icon.png" alt="User Profile" className="user-avatar" />
                <span className="user-name">{user.username || 'rohan_coder'}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title="Sign out of your session"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: 'var(--primary, #3b82f6)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;
