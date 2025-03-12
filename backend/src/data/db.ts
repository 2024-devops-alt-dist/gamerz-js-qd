
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI;


async function connectDB() {
  try {
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri,);
    // Send a ping to confirm a successful connection
    /* const adminDB = mongoose.Connection.prototype.db;
    if(!adminDB){
      throw new Error('No adminDB');
    }
    await adminDB.command({ ping: 1 }); */
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) { 
    console.error('Error connecting to MongoDB:', error);
  }
}
connectDB().catch(console.dir);

export { connectDB };
