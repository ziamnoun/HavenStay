import { connectToDatabase } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

export async function POST(req) {
  console.log(process.env.MONGO_URI);

  try {
    const body = await req.json(); // Parse the request body
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("db"); // Make sure to use the correct DB name

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert the new user into the database
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: "User registered successfully", user: { id: result.insertedId, name, email } }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred during registration:", error);
    return new Response(JSON.stringify({ message: "Server error, please try again later" }), {
      status: 500,
    });
  }
}