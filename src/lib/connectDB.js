import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client;
let clientPromise;

// Use a global variable to preserve the client in development mode to avoid creating multiple instances during hot reloads.
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client instance.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const connectDB = async () => {
  const dbClient = await clientPromise;
  return dbClient.db(); // Return the database instance
};

export default connectDB;
