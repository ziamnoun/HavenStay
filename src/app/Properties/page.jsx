"use client"; 
import Link from "next/link";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";

const PropertiesPage = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/GetData"); 
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
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div className="text-center text-white min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 min-h-screen bg-gray-900 flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#c2956b]">Properties</h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-black text-[#c2956b] p-6 rounded-lg shadow-lg"
            >
              <img
                src={item.image || "/default-image.jpg"} // Fallback image if no image provided
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-sm mb-2">
                <strong>Location:</strong> {item.location}
              </p>
              <Link href={`/Properties/${item._id}`}>
              <button
                className="w-full mt-4 px-4 py-2 bg-[#c2956b] text-black rounded-md hover:bg-black hover:text-[#c2956b] border border-[#c2956b]"
                onClick={() => alert(`Viewing details for ${item.name}`)}
              >
                View Details
              </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#c2956b]">No data found</p> // Show message if there's no data
      )}
    </div>
  );
};

export default withAuth(PropertiesPage);
