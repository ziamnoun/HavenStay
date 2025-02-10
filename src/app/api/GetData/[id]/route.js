// import { connectToDatabase } from "@/lib/connectDB";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("db");
//     const collection = db.collection("data");

//     const property = await collection.findOne({ _id: ObjectId(params.id) });

//     if (!property) {
//       return NextResponse.json(
//         { message: "Property not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(property);
//   } catch (error) {
//     console.error("Error fetching property:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// };
// src/app/api/GetData/[id]/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/connectDB';
import { ObjectId } from 'mongodb';
import { useParams } from "next/navigation";

export async function GET(req, { params }) {
  try {
    // Ensure `params` is accessed properly
    const id=useParams();
    console.log(id)

    // Check if the ID parameter exists
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is missing.' }, { status: 400 });
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format.' }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db('db'); // Replace with your actual database name
    const collection = db.collection('data'); // Replace with your collection name

    // Find the document by its `_id`
    const result = await collection.findOne({ _id: new ObjectId(id) });

    // If no document is found, return a 404 response
    if (!result) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 });
    }

    // Return the document in the response
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
