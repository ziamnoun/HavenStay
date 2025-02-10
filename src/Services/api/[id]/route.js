import { connectToDatabase } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  try {
    // Get the MongoClient instance
    const client = await connectToDatabase();

    // Access the database
    const db = client.db("db");

    // Access the 'data' collection
    const servicesCollection = db.collection("data");

    // Convert params.id to ObjectId
    const objectId = new ObjectId(params.id);

    // Fetch data using ObjectId
    const uniqueData = await servicesCollection.findOne({ _id: objectId });

    if (!uniqueData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    // Return the fetched data as a JSON response
    return NextResponse.json(uniqueData);

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
