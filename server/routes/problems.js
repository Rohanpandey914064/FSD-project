import express from 'express';
import { problemsData } from '../data/problemsData.js';

const router = express.Router();

// Solved set in memory for this session
const solvedProblemIds = new Set([1, 2]);

// ── GET /api/problems (List with filtering & search) ──
router.get('/', (req, res) => {
  try {
    const { topic, difficulty, search } = req.query;
    let list = [...problemsData];

    if (difficulty && difficulty !== 'All') {
      list = list.filter((p) => p.difficulty.toUpperCase() === difficulty.toUpperCase());
    }

    if (topic && topic !== 'All') {
      list = list.filter((p) => p.topic.toLowerCase().includes(topic.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.id.toString() === q
      );
    }

    res.json({
      success: true,
      total: list.length,
      solvedCount: solvedProblemIds.size,
      problems: list.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        topic: p.topic,
        stage: p.stage,
        order: p.order,
        acceptanceRate: p.acceptanceRate,
        isSolved: solvedProblemIds.has(p.id),
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── GET /api/problems/:idOrSlug (Single problem details) ──
router.get('/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const problem = problemsData.find(
    (p) => p.slug === idOrSlug || p.id.toString() === idOrSlug
  );

  if (!problem) {
    return res.status(404).json({ success: false, message: 'Problem not found' });
  }

  res.json({
    success: true,
    problem: {
      ...problem,
      isSolved: solvedProblemIds.has(problem.id),
    },
  });
});

// ── POST /api/problems/:id/run (Simulated execution for test cases) ──
router.post('/:id/run', (req, res) => {
  const { id } = req.params;
  const { language, code } = req.body;

  const problem = problemsData.find((p) => p.id.toString() === id);
  if (!problem) {
    return res.status(404).json({ success: false, message: 'Problem not found' });
  }

  // Basic check for empty or broken code
  if (!code || code.trim().length < 10) {
    return res.json({
      success: true,
      status: 'Compile Error',
      runtime: 0,
      memory: '0 MB',
      output: 'SyntaxError: Unexpected end of input',
      testResults: [],
    });
  }

  // Simulated realistic metrics
  const runtime = Math.floor(Math.random() * 25) + 35; // 35 - 60ms
  const memory = (Math.random() * 2 + 13.8).toFixed(1); // 13.8 - 15.8 MB

  const testResults = (problem.testCases || []).map((tc, idx) => ({
    caseNumber: idx + 1,
    passed: true,
    input: tc.input,
    expectedOutput: tc.expected,
    actualOutput: tc.expected,
  }));

  res.json({
    success: true,
    status: 'Finished',
    language: language || 'javascript',
    runtime: `${runtime} ms`,
    memory: `${memory} MB`,
    totalTests: testResults.length,
    passedTests: testResults.length,
    testResults,
  });
});

// ── POST /api/problems/:id/submit (Simulated full submission) ──
router.post('/:id/submit', (req, res) => {
  const { id } = req.params;
  const { language, code } = req.body;

  const problem = problemsData.find((p) => p.id.toString() === id);
  if (!problem) {
    return res.status(404).json({ success: false, message: 'Problem not found' });
  }

  if (!code || code.trim().length < 10) {
    return res.json({
      success: true,
      verdict: 'Compile Error',
      error: 'Incomplete implementation',
    });
  }

  // Mark solved
  solvedProblemIds.add(problem.id);

  const runtime = Math.floor(Math.random() * 20) + 42;
  const memory = (Math.random() * 1.5 + 14.1).toFixed(1);
  const beatsRuntime = (Math.random() * 10 + 88).toFixed(1);
  const beatsMemory = (Math.random() * 15 + 75).toFixed(1);

  res.json({
    success: true,
    verdict: 'Accepted',
    runtime: `${runtime} ms`,
    beatsRuntime: `${beatsRuntime}%`,
    memory: `${memory} MB`,
    beatsMemory: `${beatsMemory}%`,
    passedTests: 45,
    totalTests: 45,
    problemId: problem.id,
    language: language || 'javascript',
    timestamp: new Date().toISOString(),
  });
});

export default router;
