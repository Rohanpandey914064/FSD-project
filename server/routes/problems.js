import express from 'express';
import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { User } from '../models/User.js';
import { evaluateCode } from '../utils/codeRunner.js';

const router = express.Router();

// ── GET /api/problems (Fetch all problems directly from MongoDB) ──
router.get('/', async (req, res) => {
  try {
    const { topic, difficulty, search } = req.query;
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

    // Direct MongoDB Query
    const problems = await Problem.find(filter).sort({ id: 1 }).lean();
    const user = await User.findOne({ userId: 'usr_9912' }).lean();
    const solvedIds = new Set(user?.solvedProblemIds || []);

    res.json({
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
  } catch (error) {
    res.status(500).json({ success: false, message: `MongoDB Query Error: ${error.message}` });
  }
});

// ── GET /api/problems/:idOrSlug (Fetch single problem directly from MongoDB) ──
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isNum = !isNaN(Number(idOrSlug));

    // Direct MongoDB Query
    const problem = await Problem.findOne(
      isNum ? { $or: [{ id: Number(idOrSlug) }, { slug: idOrSlug }] } : { slug: idOrSlug }
    ).lean();

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found in MongoDB' });
    }

    const user = await User.findOne({ userId: 'usr_9912' }).lean();
    const solvedIds = new Set(user?.solvedProblemIds || []);

    res.json({
      success: true,
      source: 'MongoDB',
      problem: {
        ...problem,
        isSolved: solvedIds.has(problem.id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `MongoDB Query Error: ${error.message}` });
  }
});

// ── POST /api/problems/:id/run (Run testcases on problem fetched from MongoDB) ──
router.post('/:id/run', async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    // Direct MongoDB Query
    const problem = await Problem.findOne({ id: Number(id) }).lean();
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found in MongoDB' });
    }

    // Dynamic execution using test cases stored in MongoDB
    const evalResult = await evaluateCode(code, language, problem);

    res.json({
      success: true,
      source: 'MongoDB',
      ...evalResult,
      language: language || 'javascript',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Evaluation Error: ${error.message}` });
  }
});

// ── POST /api/problems/:id/submit (Evaluate and persist submission directly into MongoDB) ──
router.post('/:id/submit', async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code } = req.body;

    // Direct MongoDB Query
    const problem = await Problem.findOne({ id: Number(id) }).lean();
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found in MongoDB' });
    }

    // Dynamic evaluation
    const evalResult = await evaluateCode(code, language, problem);
    const isAccepted = evalResult.verdict === 'Accepted';

    // Persist real submission document in MongoDB
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
      // Update User progress directly in MongoDB
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
      source: 'MongoDB',
      ...evalResult,
      problemId: problem.id,
      language: language || 'javascript',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Submission Error: ${error.message}` });
  }
});

export default router;
