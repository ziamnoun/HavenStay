"use client"; // Ensure the code is run on the client-side

import { useEffect, useState } from 'react';

const PropertiesPage = () => {
  const [data, setData] = useState([]); // Store the fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/GetData'); // Adjust the URL as needed
        if (!res.ok) {
          throw new Error('Failed to fetch data');
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
  }, []);
  console.log(data) // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an error
  }

  return (
    <div>
      <h1>Properties</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {/* Display your data properties here */}
              {item.propertyName} {/* Adjust according to your data structure */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found</p> // Show message if there's no data
      )}
    </div>
  );
};

export default PropertiesPage;
