import React, { useState, useEffect } from 'react';
import { contestApi } from '../services/api';

export const ContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cData, lData] = await Promise.all([
          contestApi.getContests(),
          contestApi.getLeaderboard(),
        ]);
        if (cData.success) setContests(cData.contests);
        if (lData.success) setLeaderboard(lData.leaderboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="hero-section" style={{ textAlign: 'left', padding: '10px 0 24px' }}>
        <h1 className="hero-title" style={{ fontSize: '28px' }}>CodingX Contests & Tournaments</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Compete in weekly rated algorithms challenges, climb the global ranking, and win badges.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Contests List */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px' }}>
            Featured Contests
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {contests.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: c.status === 'ACTIVE' ? '#dcfce7' : '#f1f5f9',
                        color: c.status === 'ACTIVE' ? '#15803d' : '#475569',
                      }}
                    >
                      {c.status}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.duration}</span>
                  </div>

                  <h4 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '4px' }}>
                    {c.title}
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Starts: {c.startTime} • {c.registeredUsers} Coders registered
                  </div>
                </div>

                <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                  {c.status === 'ACTIVE' ? 'Enter Contest' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard Panel */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px' }}>
            Global Leaderboard 🏆
          </h3>

          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 14px' }}>Rank</th>
                  <th style={{ padding: '10px 14px' }}>User</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((u) => (
                  <tr key={u.rank} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: '800', color: u.rank <= 3 ? '#f59e0b' : 'inherit' }}>
                      #{u.rank}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: '700' }}>
                      {u.username}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: 'var(--primary)' }}>
                      {u.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
