import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemApi } from '../services/api';
import { AdventureMap } from '../components/AdventureMap';
import { ProblemList } from '../components/ProblemList';

export const HomePage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await problemApi.getProblems();
        if (data.success) {
          setProblems(data.problems);
        }
      } catch (err) {
        console.error('Failed to load problems from backend:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const handleResumeQuest = () => {
    const nextUnsolved = problems.find((p) => !p.isSolved) || problems[0];
    if (nextUnsolved) {
      navigate(`/problems/${nextUnsolved.slug || nextUnsolved.id}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Coding Adventure</h1>
        <div className="hero-actions">
          <button onClick={handleResumeQuest} className="btn-primary">
            <span>Resume Quest</span>
            <span>➔</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="btn-secondary"
          >
            {viewMode === 'map' ? 'Problem List' : 'Adventure Map'}
          </button>
        </div>
      </section>

      {/* Stage Selector Bar */}
      <div className="stage-control">
        <div className="stage-badge">
          <span>🗺️ STAGES</span>
          <span className="stage-pill">S1</span>
          <span>▾</span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
          Interactive RPG Code Map (10 Problems per Stage)
        </div>
      </div>

      {/* Content View */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <p>Loading your CodingX Adventure...</p>
        </div>
      ) : viewMode === 'map' ? (
        <AdventureMap problems={problems} />
      ) : (
        <ProblemList problems={problems} />
      )}
    </div>
  );
};
