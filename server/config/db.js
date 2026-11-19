import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codingx';
    const conn = await mongoose.connect(connUri);
    console.log(`🍃 MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ Fatal: MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
