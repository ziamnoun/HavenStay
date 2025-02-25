

import { connectToDatabase } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, name, profilePic, location, gender, age, profession, bio } = body;

    // Validate input: Ensure email is provided
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("db");

    // Check if the user with the provided email exists
    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user profile by email
    await db.collection("users").updateOne(
      { email }, // Search by email
      {
        $set: {
          name,
          profilePic,
          location,
          gender,
          age,
          profession,
          bio,
        },
      }
    );

    // Return success response
    return NextResponse.json({ message: "Profile updated successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error updating profile:", error);

    // Return error response if something goes wrong
    return NextResponse.json({ message: "Server error, please try again later" }, { status: 500 });
  }
}
