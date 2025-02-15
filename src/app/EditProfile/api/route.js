import { connectToDatabase } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, profilePic, location, gender, age, profession, bio } = body;

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), { status: 400 });
    }

  
    const client = await connectToDatabase();
    const db = client.db("db"); 

    
    const existingUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name,
          profilePic,
          location,
          gender,
          age,
          profession,
          bio
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "Profile updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(
      JSON.stringify({ message: "Server error, please try again later" }),
      { status: 500 }
    );
  }
}
