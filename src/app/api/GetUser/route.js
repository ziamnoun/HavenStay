import { connectToDatabase } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Get the MongoClient instance
    const client = await connectToDatabase();

    // Access the database with client.db('your_db_name') 
    const db = client.db('db'); 

    // Access the 'data' collection
    const servicesCollection = db.collection('users');
    
    // Fetch all data from the collection
    const allData = await servicesCollection.find().toArray();

    // Return the fetched data as a JSON response
    return NextResponse.json({ allData });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
