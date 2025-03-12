
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI;


async function connectDB() {
  try {
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    // Connect to MongoDB
    await mongoose.connect(uri,);

    mongoose.connection.once('open', async () => {
      try {
        // Ping de la base de données
        const db = mongoose.connection.db
          if (!db) {
            throw new Error('Database connection is not established');
          }
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
      } catch (error) {
        console.error('Error with MongoDB ping:', error);
      }
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) { 
    console.error('Error connecting to MongoDB:', error);
  }
}
connectDB().catch(console.dir);

export { connectDB };
