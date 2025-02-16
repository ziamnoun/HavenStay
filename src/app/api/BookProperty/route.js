import { connectToDatabase } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { propertyId, duration } = body;

   
    if (!propertyId || !duration) {
      return new Response(JSON.stringify({ message: "Property ID and duration are required" }), { status: 400 });
    }

    
    const client = await connectToDatabase();
    const db = client.db("db");
    const collection = db.collection("data"); 

    
    const property = await collection.findOne({ _id: new ObjectId(propertyId) });

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), { status: 404 });
    }

    
    const currentDate = new Date();
    if (property.bookedUntil && new Date(property.bookedUntil) > currentDate) {
      return new Response(JSON.stringify({ message: "Property is already booked" }), { status: 400 });
    }

    
    const bookedUntil = new Date();
    bookedUntil.setDate(bookedUntil.getDate() + duration); 

  
    await collection.updateOne(
      { _id: new ObjectId(propertyId) },
      { $set: { isBooked: true, bookedUntil } }
    );

    return new Response(
      JSON.stringify({ message: `Property booked for ${duration} days`, bookedUntil }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return new Response(JSON.stringify({ message: "Server error, please try again later" }), {
      status: 500,
    });
  }
}
