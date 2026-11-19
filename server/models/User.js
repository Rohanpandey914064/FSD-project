import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, default: 'usr_9912' },
    username: { type: String, required: true, default: 'rohan_coder' },
    email: { type: String, required: true, default: 'developer@codingx.com' },
    role: { type: String, default: 'USER' },
    rating: { type: Number, default: 1845 },
    globalRank: { type: Number, default: 142 },
    streak: { type: Number, default: 7 },
    solvedProblemIds: [{ type: Number }],
    solved: {
      total: { type: Number, default: 2 },
      easy: { type: Number, default: 2 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    recentSubmissions: [
      {
        problem: { type: String },
        status: { type: String },
        lang: { type: String },
        time: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
