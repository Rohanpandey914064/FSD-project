import express from 'express';
import mongoose from 'mongoose';
import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { User } from '../models/User.js';
import { problemsData } from '../data/problemsData.js';
import { evaluateCode } from '../utils/codeRunner.js';

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

// ── POST /api/problems/:id/run (Real VM Execution for sample test cases) ──
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

    // Evaluate code dynamically via Universal Engine
    const evalResult = await evaluateCode(code, language, problem);

    res.json({
      success: true,
      ...evalResult,
      language: language || 'javascript',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── POST /api/problems/:id/submit (Real VM Full Evaluation with MongoDB Persistence) ──
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

    // Evaluate code dynamically via Universal Engine
    const evalResult = await evaluateCode(code, language, problem);

    const isAccepted = evalResult.verdict === 'Accepted';

    if (isAccepted) {
      fallbackSolvedSet.add(problem.id);
    }

    // Save submission record to MongoDB if connected
    if (isDbConnected()) {
      await Submission.create({
        problemId: problem.id,
        problemTitle: problem.title,
        userId: 'usr_9912',
        username: 'rohan_coder',
        language: language || 'javascript',
        code: code,
        verdict: evalResult.verdict || 'Wrong Answer',
        runtime: evalResult.runtime || '0 ms',
        memory: evalResult.memory || '0 MB',
        passedTests: evalResult.passedTests || 0,
        totalTests: evalResult.totalTests || 0,
      });

      if (isAccepted) {
        // Update user's solved problem records
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
    }

    res.json({
      success: true,
      ...evalResult,
      problemId: problem.id,
      language: language || 'javascript',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
