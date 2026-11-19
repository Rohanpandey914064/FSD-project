import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ solvedCount = 24, totalCount = 150 }) => {
  const location = useLocation();

  return (
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

      <div className="nav-actions">
        <div className="progress-pill">
          <span className="progress-dot" />
          <span>{solvedCount}/{totalCount} Solved</span>
        </div>

        <Link to="/profile" className="user-profile-btn">
          <img src="/profile-icon.png" alt="User Profile" className="user-avatar" />
          <span className="user-name">rohan_coder</span>
        </Link>
      </div>
    </header>
  );
};
