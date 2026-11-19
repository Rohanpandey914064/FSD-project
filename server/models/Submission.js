import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    problemId: { type: Number, required: true },
    problemTitle: { type: String, required: true },
    userId: { type: String, default: 'usr_9912' },
    username: { type: String, default: 'rohan_coder' },
    language: { type: String, required: true },
    code: { type: String, required: true },
    verdict: { type: String, required: true },
    runtime: { type: String },
    memory: { type: String },
    passedTests: { type: Number, default: 0 },
    totalTests: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
export default Submission;
