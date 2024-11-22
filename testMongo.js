import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config(); // This will load the variables from .env file


const uri = process.env.MONGO_URI; // Replace with your MongoDB URI

async function testConnection() {
  const client = new MongoClient(uri); // Don't need `useUnifiedTopology` option anymore.
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

testConnection();
