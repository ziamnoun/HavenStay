"use client"; 
"use client"; 
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PropertyDetailsPage = () => {
  const id  = useParams(); // Get the id from the URL parameters
  const [data, setData] = useState([]); // Set initial state as an array
  const [property, setProperty] = useState(null); // To store the specific property
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
console.log(id.Id);
  // Fetch all data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/GetData");
         // Fetch all data
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result.allData); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set the error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchData();
  }, []); // Only fetch once when the component mounts
  console.log(data)

  // Filter the property based on id after the data is fetched
  useEffect(() => {
    if (data.length > 0 && id) {
      const matchedProperty = data.find(item => item._id === id.Id);
      setProperty(matchedProperty); // Set the matched property
    }
  }, [data, id]); // Run this effect whenever data or id changes

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
<div className="div bg-gray-900 min-h-screen">
<div className="bg-black text-white p-6 rounded-lg max-w-lg mx-auto mt-auto">
    <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
    <p className="text-lg mb-4">{property.location}</p>
    <img 
      className="w-full h-64 object-cover rounded-lg mb-4"
      src={property.image || "/default-image.jpg"} 
      alt={property.name} 
    />
    <div className="mb-4">
      <span className="text-xl font-semibold">{property.hotelName}</span>
      <p className="text-md mt-1">{property.type}</p>
    </div>
    <button 
      className={`bg-[#c2956b] text-white py-2 px-4 rounded-full w-full mt-4 ${property.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={property.isBooked}
    >
      {property.isBooked ? "Already Booked" : "Book Now"}
    </button>
  </div>
</div>
  
  );
};

export default PropertyDetailsPage;
