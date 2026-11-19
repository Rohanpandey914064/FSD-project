import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NODE_POSITIONS = [
  { left: 24, top: 76 },
  { left: 32, top: 60 },
  { left: 39, top: 68 },
  { left: 44, top: 58 },
  { left: 49, top: 48 },
  { left: 58, top: 56 },
  { left: 65, top: 64 },
  { left: 72, top: 70 },
  { left: 79, top: 75 },
  { left: 86, top: 80 },
];

const MASCOTS = [
  '/mascots/mascot-1.png',
  '/mascots/mascot-2.png',
  '/mascots/mascot-3.png',
];

export const AdventureMap = ({ problems = [] }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);

  // Take first 10 problems for the interactive stage map
  const stageProblems = problems.slice(0, 10);
  const selectedProblem = problems.find((p) => p.id === selectedId) || problems[0] || {};
  const currentMascot = MASCOTS[(selectedProblem.id || 0) % MASCOTS.length];

  return (
    <div className="adventure-card">
      {/* Top Banner inside Adventure Bezel */}
      <div className="adventure-header">
        <div className="adventure-header-title">
          <span style={{ fontSize: '16px' }}>🗺️</span>
          <span>CODING ADVENTURE · STAGE 1 (PROBLEMS 1–10)</span>
        </div>
        <div className="stage-badge" style={{ padding: '4px 10px', fontSize: '11px' }}>
          <span>LEVELS ▾</span>
        </div>
      </div>

      {/* Map Viewport Canvas */}
      <div className="map-viewport">
        <img
          src="/adventure-map.jpg"
          alt="Adventure World Map"
          className="map-bg-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Trail SVG */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 24 76 Q 28 68 32 60 Q 35 64 39 68 Q 41.5 63 44 58 Q 46.5 53 49 48 Q 53.5 52 58 56 Q 61.5 60 65 64 Q 68.5 67 72 70 Q 75.5 72.5 79 75 Q 82.5 77.5 86 80"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeDasharray="2,2"
          />
        </svg>

        {/* Interactive 3D Nodes */}
        {stageProblems.map((prob, idx) => {
          const pos = NODE_POSITIONS[idx] || { left: 50, top: 50 };
          const isSelected = prob.id === selectedId;
          const isSolved = prob.isSolved;

          return (
            <button
              key={prob.id}
              onClick={() => setSelectedId(prob.id)}
              className={`map-node ${isSelected ? 'active' : isSolved ? 'solved' : 'locked'}`}
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              title={`#${prob.id} ${prob.title}`}
            >
              {isSolved ? '✓' : prob.id}
            </button>
          );
        })}
      </div>

      {/* Selected Problem Details Card with Coding Mascot */}
      {selectedProblem && (
        <div className="problem-card">
          <div className="problem-card-left">
            <div className="problem-card-header">
              <span className="problem-tag">PROBLEM {selectedProblem.id}</span>
              <span className={`diff-badge diff-${(selectedProblem.difficulty || 'easy').toLowerCase()}`}>
                {selectedProblem.difficulty}
              </span>
              <span style={{ color: '#f59e0b', fontSize: '12px' }}>★★★</span>
            </div>

            <h3 className="problem-card-title">{selectedProblem.title}</h3>

            <div className="problem-status-row">
              <span>⚡</span>
              <span>{selectedProblem.isSolved ? 'Completed' : 'Ready to Solve'}</span>
              <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>{selectedProblem.topic}</span>
            </div>
          </div>

          {/* Cute Coding Mascot */}
          <div className="problem-card-mascot">
            <img
              src={currentMascot}
              alt="Mascot Avatar"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="problem-card-actions">
            <button
              onClick={() => navigate(`/problems/${selectedProblem.slug || selectedProblem.id}`)}
              className="btn-secondary"
            >
              Learn
            </button>
            <button
              onClick={() => navigate(`/problems/${selectedProblem.slug || selectedProblem.id}`)}
              className="btn-primary"
            >
              Solve ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
