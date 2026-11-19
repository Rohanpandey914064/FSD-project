import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ['ACTIVE', 'UPCOMING', 'COMPLETED'], default: 'UPCOMING' },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    registeredUsers: { type: Number, default: 0 },
    questionsCount: { type: Number, default: 4 },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    solved: { type: Number, required: true },
    country: { type: String, default: 'IN' },
  },
  {
    timestamps: true,
  }
);

export const Contest = mongoose.models.Contest || mongoose.model('Contest', contestSchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);

export default { Contest, Leaderboard };
