import React, { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { AuthModal } from '../components/AuthModal';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.getProfile();
        if (res.success && res.user) {
          setProfile(res.user);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading user profile...</div>;
  }

  if (!profile) {
    return (
      <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '40px 24px', backgroundColor: '#fff', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>Sign in to View Profile</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
          Please sign in to track your personal solved problems, current streaks, and coding statistics.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          style={{
            backgroundColor: 'var(--primary, #3b82f6)',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Sign In / Register
        </button>
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(u) => {
            setProfile(u);
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Profile Header */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px',
        }}
      >
        <img
          src="/profile-icon.png"
          alt="Avatar"
          style={{ width: '84px', height: '84px', borderRadius: '50%', border: '2px solid var(--border-subtle)' }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
            {profile.username}
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '10px' }}>
            {profile.email} • Full-Stack Software Engineer
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: '700' }}>
            <div>🏆 Rating: <span style={{ color: 'var(--primary)' }}>{profile.rating}</span></div>
            <div>🌍 Global Rank: <span>#{profile.globalRank}</span></div>
            <div>🔥 Current Streak: <span style={{ color: '#ea580c' }}>{profile.streak} Days</span></div>
          </div>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '24px' }}>
        {/* Solved Summary Box */}
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px' }}>Solved Problems</h3>
          <div style={{ fontSize: '38px', fontWeight: '800', color: 'var(--primary)', marginBottom: '12px' }}>
            {profile.solved.total} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/ 150</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--easy-color)', fontWeight: '700' }}>Easy</span>
              <strong>{profile.solved.easy} / 50</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--medium-color)', fontWeight: '700' }}>Medium</span>
              <strong>{profile.solved.medium} / 70</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--hard-color)', fontWeight: '700' }}>Hard</span>
              <strong>{profile.solved.hard} / 30</strong>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px' }}>Recent Submissions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {profile.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  fontSize: '13px',
                }}
              >
                <div>
                  <div style={{ fontWeight: '700' }}>{sub.problem}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub.lang} • {sub.time}</div>
                </div>
                <span style={{ color: '#10b981', fontWeight: '700', fontSize: '12px' }}>
                  ✓ {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
