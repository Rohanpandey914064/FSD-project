import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problemApi } from '../services/api';

export const ProblemPage = () => {
  const { idOrSlug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const data = await problemApi.getProblemById(idOrSlug);
        if (data.success && data.problem) {
          setProblem(data.problem);
          // Do not pre-fill code automatically - student writes from scratch
          setCode('');
        }
      } catch (err) {
        console.error('Error fetching problem:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [idOrSlug]);

  // Update language without overriding student's code automatically
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
  };

  const handleRun = async () => {
    if (!problem) return;
    if (!code || code.trim().length === 0) {
      setRunResult({
        status: 'Compile Error',
        runtime: '0 ms',
        memory: '0 MB',
        error: 'Editor is empty! Please write your code first before running.',
        passedTests: 0,
        totalTests: 0,
        testResults: [],
      });
      return;
    }
    setIsRunning(true);
    setRunResult(null);
    setSubmitResult(null);
    try {
      const res = await problemApi.runCode(problem.id, language, code);
      setRunResult(res);
    } catch (err) {
      console.error(err);
      setRunResult({ status: 'Error', error: 'Network error or execution timeout' });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!code || code.trim().length === 0) {
      setSubmitResult({
        verdict: 'Compile Error',
        error: 'Editor is empty! Please write your code first before submitting.',
        passedTests: 0,
        totalTests: 0,
        testResults: [],
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitResult(null);
    setRunResult(null);
    try {
      const res = await problemApi.submitCode(problem.id, language, code);
      setSubmitResult(res);
    } catch (err) {
      console.error(err);
      setSubmitResult({ verdict: 'Error', error: 'Submission service unreachable' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
        Loading Problem #{idOrSlug}...
      </div>
    );
  }

  if (!problem) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Problem not found</h2>
        <Link to="/problems" className="btn-primary" style={{ marginTop: '16px' }}>
          Back to Problem List
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Top Breadcrumb bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', fontSize: '13px' }}>
        <Link to="/problems" style={{ color: 'var(--primary)', fontWeight: '600' }}>
          ← Problems
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontWeight: '700' }}>#{problem.id} {problem.title}</span>
      </div>

      <div className="workspace-layout">
        {/* Left Panel: Problem Description */}
        <div className="workspace-panel">
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="panel-title">{problem.title}</span>
              <span className={`diff-badge diff-${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{problem.topic}</span>
          </div>

          <div className="panel-body">
            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '14px', color: 'var(--text-primary)' }}>
              {problem.description}
            </div>

            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Examples
                </h4>
                {problem.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      marginBottom: '12px',
                      fontSize: '13px',
                      lineHeight: '1.6',
                    }}
                  >
                    <div><strong>Input:</strong> <code className="font-mono">{ex.input}</code></div>
                    <div><strong>Output:</strong> <code className="font-mono">{ex.output}</code></div>
                    {ex.explanation && (
                      <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        <strong>Explanation:</strong> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Constraints
                </h4>
                <ul style={{ paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  {problem.constraints.map((c, i) => (
                    <li key={i}><code>{c}</code></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Interactive Code Editor */}
        <div className="workspace-panel">
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700' }}>Language:</span>
              <select
                className="filter-select"
                style={{ padding: '4px 10px', fontSize: '12px' }}
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="python">Python 3</option>
                <option value="cpp">C++ (GCC 12)</option>
                <option value="java">Java 17</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCode('')}
                style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}
                title="Clear editor"
              >
                Clear 🗑️
              </button>
              <button
                onClick={() => {
                  if (problem && problem.starterCode && problem.starterCode[language]) {
                    setCode(problem.starterCode[language]);
                  }
                }}
                style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}
                title="Load starter template if needed"
              >
                Template 📋
              </button>
            </div>
          </div>

          <div className="panel-body" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
            <textarea
              className="code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Student Workspace: Type your solution from scratch here..."
              spellCheck="false"
            />
          </div>

          {/* Test Case & Submission Output Console */}
          {(runResult || submitResult) && (
            <div style={{ padding: '12px 16px', background: '#0f172a', borderTop: '1px solid #1e293b' }}>
              {runResult && (
                <div style={{ color: '#fff', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{
                      color: runResult.status === 'Finished' ? '#10b981' : '#ef4444',
                      fontWeight: '800'
                    }}>
                      {runResult.status === 'Finished' ? '✓ Finished' : `❌ ${runResult.status}`}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      Runtime: {runResult.runtime} | Memory: {runResult.memory}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                    Passed {runResult.passedTests}/{runResult.totalTests} sample test cases.
                  </div>
                  {runResult.error && (
                    <div style={{ color: '#f87171', fontSize: '12px', fontFamily: 'monospace', background: '#1e1e2f', padding: '6px 10px', borderRadius: '4px' }}>
                      {runResult.error}
                    </div>
                  )}
                  {runResult.testResults && runResult.testResults.some((t) => !t.passed) && (
                    <div style={{ marginTop: '8px', fontSize: '12px' }}>
                      {runResult.testResults.filter((t) => !t.passed).slice(0, 1).map((t, idx) => (
                        <div key={idx} style={{ background: '#181e2e', padding: '8px 10px', borderRadius: '4px', borderLeft: '3px solid #ef4444' }}>
                          <div style={{ color: '#f87171', fontWeight: '600' }}>Failed Case #{t.caseNumber}:</div>
                          <div style={{ color: '#94a3b8' }}>Input: <span style={{ color: '#e2e8f0' }}>{t.input}</span></div>
                          <div style={{ color: '#94a3b8' }}>Expected: <span style={{ color: '#34d399' }}>{t.expectedOutput}</span></div>
                          <div style={{ color: '#94a3b8' }}>Your Output: <span style={{ color: '#f87171' }}>{t.actualOutput}</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {submitResult && (
                <div style={{ color: '#fff', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{
                      color: submitResult.verdict === 'Accepted' ? '#10b981' : '#ef4444',
                      fontSize: '15px',
                      fontWeight: '800'
                    }}>
                      {submitResult.verdict === 'Accepted' ? '🎉 Accepted!' : `❌ ${submitResult.verdict}`}
                    </span>
                    {submitResult.verdict === 'Accepted' && (
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>
                        {submitResult.runtime} (Beats {submitResult.beatsRuntime})
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                    {submitResult.verdict === 'Accepted'
                      ? `Passed all ${submitResult.passedTests}/${submitResult.totalTests} test cases smoothly.`
                      : `Passed ${submitResult.passedTests || 0}/${submitResult.totalTests || 0} test cases.`
                    }
                  </div>
                  {submitResult.testResults && submitResult.testResults.some((t) => !t.passed) && (
                    <div style={{ marginTop: '8px', fontSize: '12px' }}>
                      {submitResult.testResults.filter((t) => !t.passed).slice(0, 1).map((t, idx) => (
                        <div key={idx} style={{ background: '#181e2e', padding: '8px 10px', borderRadius: '4px', borderLeft: '3px solid #ef4444' }}>
                          <div style={{ color: '#f87171', fontWeight: '600' }}>Wrong Answer on Case #{t.caseNumber}:</div>
                          <div style={{ color: '#94a3b8' }}>Input: <span style={{ color: '#e2e8f0' }}>{t.input}</span></div>
                          <div style={{ color: '#94a3b8' }}>Expected: <span style={{ color: '#34d399' }}>{t.expectedOutput}</span></div>
                          <div style={{ color: '#94a3b8' }}>Your Output: <span style={{ color: '#f87171' }}>{t.actualOutput}</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                  {submitResult.error && (
                    <div style={{ marginTop: '6px', color: '#f87171', fontSize: '12px', fontFamily: 'monospace', background: '#1e1e2f', padding: '6px 10px', borderRadius: '4px' }}>
                      {submitResult.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer Actions: Run & Submit */}
          <div className="editor-footer">
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Auto-saved
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="btn-secondary"
                style={{ padding: '7px 18px' }}
              >
                {isRunning ? 'Running...' : '▶ Run Code'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary"
                style={{ padding: '7px 22px' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit ➔'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
