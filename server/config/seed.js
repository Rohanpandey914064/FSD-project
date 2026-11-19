import mongoose from 'mongoose';
import { Problem } from '../models/Problem.js';
import { Contest, Leaderboard } from '../models/Contest.js';
import { User } from '../models/User.js';
import { problemsData } from '../data/problemsData.js';
import { contestsData, leaderboardData } from '../data/contestsData.js';

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    // 1. Seed Problems
    const problemCount = await Problem.countDocuments();
    if (problemCount === 0) {
      console.log('🌱 Seeding Problems into MongoDB...');
      await Problem.insertMany(problemsData);
      console.log(`✅ ${problemsData.length} problems inserted successfully.`);
    }

    // 2. Seed Contests
    const contestCount = await Contest.countDocuments();
    if (contestCount === 0) {
      console.log('🌱 Seeding Contests into MongoDB...');
      await Contest.insertMany(contestsData);
      console.log(`✅ ${contestsData.length} contests inserted successfully.`);
    }

    // 3. Seed Leaderboard
    const lbCount = await Leaderboard.countDocuments();
    if (lbCount === 0) {
      console.log('🌱 Seeding Leaderboard into MongoDB...');
      await Leaderboard.insertMany(leaderboardData);
      console.log(`✅ ${leaderboardData.length} leaderboard entries inserted.`);
    }

    // 4. Seed Default User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Creating Default Demo User in MongoDB...');
      await User.create({
        userId: 'usr_9912',
        username: 'rohan_coder',
        email: 'developer@codingx.com',
        role: 'USER',
        rating: 1845,
        globalRank: 142,
        streak: 7,
        solvedProblemIds: [1, 2],
        solved: { total: 24, easy: 15, medium: 7, hard: 2 },
        recentSubmissions: [
          { problem: 'Two Sum', status: 'Accepted', lang: 'JavaScript', time: '2 hours ago' },
          { problem: 'Valid Parentheses', status: 'Accepted', lang: 'Python', time: 'Yesterday' },
          { problem: 'Min Stack', status: 'Accepted', lang: 'C++', time: '3 days ago' },
        ],
      });
      console.log('✅ Demo User initialized in MongoDB.');
    }
  } catch (err) {
    console.error('⚠️ Seeding warning:', err.message);
  }
};

export default seedDatabase;
