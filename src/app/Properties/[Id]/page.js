// "use client"; 

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const PropertyDetailsPage = () => {
//   const id  = useParams(); // Get the id from the URL parameters
//   const [data, setData] = useState([]); // Set initial state as an array
//   const [property, setProperty] = useState(null); // To store the specific property
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 
// console.log(id.Id);
//   // Fetch all data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/GetData");
//          // Fetch all data
//         if (!res.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await res.json();
//         setData(result.allData); // Set the fetched data
//       } catch (err) {
//         setError(err.message); // Set the error message if fetching fails
//       } finally {
//         setLoading(false); // Set loading to false once fetching is done
//       }
//     };

//     fetchData();
//   }, []); // Only fetch once when the component mounts
//   console.log(data)

//   // Filter the property based on id after the data is fetched
//   useEffect(() => {
//     if (data.length > 0 && id) {
//       const matchedProperty = data.find(item => item._id === id.Id);
//       setProperty(matchedProperty); // Set the matched property
//     }
//   }, [data, id]); // Run this effect whenever data or id changes

//   if (error) return <p>Error: {error}</p>;
//   if (loading) return <p>Loading...</p>;
//   if (!property) return <p>Property not found</p>;

//   return (
// <div className="div bg-gray-900 min-h-screen">
// <div className="bg-black text-white p-6 rounded-lg max-w-lg mx-auto mt-auto">
//     <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
//     <p className="text-lg mb-4">{property.location}</p>
//     <img 
//       className="w-full h-64 object-cover rounded-lg mb-4"
//       src={property.image || "/default-image.jpg"} 
//       alt={property.name} 
//     />
//     <div className="mb-4">
//       <span className="text-xl font-semibold">{property.hotelName}</span>
//       <p className="text-md mt-1">{property.type}</p>
//     </div>
//     <button 
//       className={`bg-[#c2956b] text-white py-2 px-4 rounded-full w-full mt-4 ${property.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
//       disabled={property.isBooked}
//     >
//       {property.isBooked ? "Already Booked" : "Book Now"}
//     </button>
//   </div>
// </div>
  
//   );
// };

// export default PropertyDetailsPage;
"use client"; 

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PropertyDetailsPage = () => {
  const id = useParams();
  const [data, setData] = useState([]);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(1); // Default: 1 day
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/GetData");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result.allData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && id) {
      const matchedProperty = data.find((item) => item._id === id.Id);
      setProperty(matchedProperty);
    }
  }, [data, id]);

  const handleBooking = async () => {
    if (!property || property.isBooked) return;

    try {
      const response = await fetch("/api/BookProperty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property._id, duration }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingMessage(result.message);
        setProperty((prev) => ({
          ...prev,
          isBooked: true,
          bookedUntil: result.bookedUntil,
        }));
      } else {
        setBookingMessage(result.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-black text-white p-6 rounded-lg max-w-lg">
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

        {/* Duration Selector */}
        <label className="block text-white text-sm mb-2">Select Booking Duration:</label>
        <select
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
          <option value={4}>4 Days</option>
          <option value={5}>5 Days</option>
          <option value={6}>6 Days</option>
          <option value={7}>7 Days</option>
        </select>

        <button
          className={`bg-[#c2956b] text-white py-2 px-4 rounded-full w-full mt-4 ${
            property.isBooked ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={property.isBooked}
          onClick={handleBooking}
        >
          {property.isBooked ? "Already Booked" : "Book Now"}
        </button>

        {bookingMessage && <p className="text-green-400 mt-2">{bookingMessage}</p>}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
