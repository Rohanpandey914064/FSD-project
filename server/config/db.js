import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codingx';
    const conn = await mongoose.connect(connUri);
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`⚠️ Running with local fallback data if MongoDB service is unavailable.`);
    return false;
  }
};

export default connectDB;
