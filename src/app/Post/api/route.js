import { connectToDatabase } from "@/lib/connectDB";

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { Email, title, author, content, category, image, createdAt } = body;

    if (!Email || !title || !author || !content || !category) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db("db");

    const result = await db.collection("blog").insertOne({
      Email,
      title,
      author,
      content,
      category,
      image,
      createdAt,
    });

    return new Response(
      JSON.stringify({ message: "Post created successfully", postId: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } } 
    );
  } catch (error) {
    console.error("Error occurred while posting:", error);
    return new Response(JSON.stringify({ message: "Server error, please try again later" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
