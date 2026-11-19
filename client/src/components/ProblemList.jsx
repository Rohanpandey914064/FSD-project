import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProblemList = ({ problems = [] }) => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('All');

  const topics = ['All', ...new Set(problems.map((p) => p.topic).filter(Boolean))];

  const filtered = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search;

    const matchesDiff = difficulty === 'All' || p.difficulty === difficulty;
    const matchesTopic = topic === 'All' || p.topic === topic;

    return matchesSearch && matchesDiff && matchesTopic;
  });

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search problems by title, topic or #ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            className="filter-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          <select
            className="filter-select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="problems-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>Status</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Topic</th>
            <th>Acceptance</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                No problems found matching your criteria.
              </td>
            </tr>
          ) : (
            filtered.map((prob) => (
              <tr key={prob.id}>
                <td>
                  {prob.isSolved ? (
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  ) : (
                    <span style={{ color: '#cbd5e1' }}>○</span>
                  )}
                </td>
                <td>
                  <Link to={`/problems/${prob.slug || prob.id}`} className="problem-title-cell">
                    <span>#{prob.id}</span>
                    <span>{prob.title}</span>
                  </Link>
                </td>
                <td>
                  <span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>
                    {prob.difficulty}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{prob.topic}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{prob.acceptanceRate}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    to={`/problems/${prob.slug || prob.id}`}
                    className="btn-primary"
                    style={{ padding: '4px 14px', fontSize: '11px' }}
                  >
                    Solve
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
