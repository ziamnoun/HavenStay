import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB(); // Get the database connection
    const connectionStatus = await db.command({ ping: 1 }); // Ping the database to ensure the connection is active

    if (connectionStatus.ok) {
      return NextResponse.json({ message: "Database connected successfully!" });
    } else {
      return NextResponse.json({ message: "Database connection failed!" }, { status: 500 });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Failed to connect to the database.", error: error.message },
      { status: 500 }
    );
  }
}
