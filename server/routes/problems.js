import express from 'express';
import mongoose from 'mongoose';
import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { User } from '../models/User.js';
import { problemsData } from '../data/problemsData.js';

const router = express.Router();

// Fallback in-memory solved set
const fallbackSolvedSet = new Set([1, 2]);

// Helper to check if Mongo is ready
const isDbConnected = () => mongoose.connection.readyState === 1;

// ── GET /api/problems (List with filtering & search) ──
router.get('/', async (req, res) => {
  try {
    const { topic, difficulty, search } = req.query;

    if (isDbConnected()) {
      const filter = {};

      if (difficulty && difficulty !== 'All') {
        filter.difficulty = difficulty.toUpperCase();
      }

      if (topic && topic !== 'All') {
        filter.topic = new RegExp(topic, 'i');
      }

      if (search) {
        const isNum = !isNaN(Number(search));
        if (isNum) {
          filter.$or = [
            { id: Number(search) },
            { title: new RegExp(search, 'i') },
            { topic: new RegExp(search, 'i') },
          ];
        } else {
          filter.$or = [
            { title: new RegExp(search, 'i') },
            { topic: new RegExp(search, 'i') },
            { slug: new RegExp(search, 'i') },
          ];
        }
      }

      const problems = await Problem.find(filter).sort({ id: 1 }).lean();
      const user = await User.findOne({ userId: 'usr_9912' }).lean();
      const solvedIds = new Set(user?.solvedProblemIds || [1, 2]);

      return res.json({
        success: true,
        source: 'MongoDB',
        total: problems.length,
        solvedCount: solvedIds.size,
        problems: problems.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          topic: p.topic,
          stage: p.stage,
          order: p.order,
          acceptanceRate: p.acceptanceRate,
          isSolved: solvedIds.has(p.id),
        })),
      });
    }

    // Fallback: In-memory datastore
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
      source: 'In-Memory',
      total: list.length,
      solvedCount: fallbackSolvedSet.size,
      problems: list.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        topic: p.topic,
        stage: p.stage,
        order: p.order,
        acceptanceRate: p.acceptanceRate,
        isSolved: fallbackSolvedSet.has(p.id),
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── GET /api/problems/:idOrSlug (Single problem details) ──
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let problem = null;
    let isSolved = false;

    if (isDbConnected()) {
      const isNum = !isNaN(Number(idOrSlug));
      problem = await Problem.findOne(
        isNum ? { $or: [{ id: Number(idOrSlug) }, { slug: idOrSlug }] } : { slug: idOrSlug }
      ).lean();

      if (problem) {
        const user = await User.findOne({ userId: 'usr_9912' }).lean();
        const solvedIds = new Set(user?.solvedProblemIds || [1, 2]);
        isSolved = solvedIds.has(problem.id);
      }
    }

    if (!problem) {
      problem = problemsData.find(
        (p) => p.slug === idOrSlug || p.id.toString() === idOrSlug
      );
      if (problem) {
        isSolved = fallbackSolvedSet.has(problem.id);
      }
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    res.json({
      success: true,
      source: isDbConnected() ? 'MongoDB' : 'In-Memory',
      problem: {
        ...problem,
        isSolved,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── POST /api/problems/:id/run (Simulated execution for test cases) ──
router.post('/:id/run', async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    let problem = null;
    if (isDbConnected()) {
      problem = await Problem.findOne({ id: Number(id) }).lean();
    }
    if (!problem) {
      problem = problemsData.find((p) => p.id.toString() === id);
    }

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

    // Realistic metrics simulation
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── POST /api/problems/:id/submit (Simulated full submission with MongoDB logging) ──
router.post('/:id/submit', async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    let problem = null;
    if (isDbConnected()) {
      problem = await Problem.findOne({ id: Number(id) }).lean();
    }
    if (!problem) {
      problem = problemsData.find((p) => p.id.toString() === id);
    }

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

    fallbackSolvedSet.add(problem.id);

    const runtime = Math.floor(Math.random() * 20) + 42;
    const memory = (Math.random() * 1.5 + 14.1).toFixed(1);
    const beatsRuntime = (Math.random() * 10 + 88).toFixed(1);
    const beatsMemory = (Math.random() * 15 + 75).toFixed(1);

    // Save to MongoDB if connected
    if (isDbConnected()) {
      await Submission.create({
        problemId: problem.id,
        problemTitle: problem.title,
        userId: 'usr_9912',
        username: 'rohan_coder',
        language: language || 'javascript',
        code: code,
        verdict: 'Accepted',
        runtime: `${runtime} ms`,
        memory: `${memory} MB`,
        passedTests: 45,
        totalTests: 45,
      });

      // Update User solved counts
      await User.findOneAndUpdate(
        { userId: 'usr_9912' },
        {
          $addToSet: { solvedProblemIds: problem.id },
          $inc: { 'solved.total': 1 },
          $push: {
            recentSubmissions: {
              $each: [
                {
                  problem: problem.title,
                  status: 'Accepted',
                  lang: language || 'javascript',
                  time: 'Just now',
                },
              ],
              $position: 0,
              $slice: 10,
            },
          },
        }
      );
    }

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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
