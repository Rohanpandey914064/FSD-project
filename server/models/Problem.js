import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expected: { type: String, required: true },
}, { _id: false });

const starterCodeSchema = new mongoose.Schema({
  javascript: { type: String },
  python: { type: String },
  cpp: { type: String },
  java: { type: String },
}, { _id: false });

const problemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    difficulty: { type: String, required: true, enum: ['EASY', 'MEDIUM', 'HARD'] },
    topic: { type: String, required: true, trim: true },
    stage: { type: Number, default: 1 },
    order: { type: Number, default: 1 },
    acceptanceRate: { type: String, default: '50.0%' },
    description: { type: String, required: true },
    examples: [exampleSchema],
    constraints: [String],
    starterCode: starterCodeSchema,
    testCases: [testCaseSchema],
  },
  {
    timestamps: true,
  }
);

export const Problem = mongoose.models.Problem || mongoose.model('Problem', problemSchema);
export default Problem;
