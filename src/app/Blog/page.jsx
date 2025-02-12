"use client";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeBlogIndex, setActiveBlogIndex] = useState(null); // Track which blog is clicked
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/GetBlog");

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

  const handleBlogClick = (index) => {
    // Toggle the blog visibility
    setActiveBlogIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"><span className="loading loading-ring loading-lg"></span></div> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <div className="flex justify-between items-center py-4 px-8">
        <h1 className="text-3xl font-bold">Latest Travel Blogs</h1>
        <button
          onClick={toggleDarkMode}
          className="py-2 px-4 bg-[#c2956b] text-white rounded-md hover:bg-[#b3825b] transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16">
        {data.map((blog, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{blog.title}</h2>
              <p className={`text-gray-500 mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{blog.content.slice(0, 150)}...</p>
              <p className={`text-gray-400 text-sm mt-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{new Date(blog.date).toLocaleDateString()}</p>

              {/* Show full content when clicked */}
              <button
                onClick={() => handleBlogClick(index)}
                className={`mt-4 inline-block ${darkMode ? "text-[#f6c29e]" : "text-[#c2956b]"} font-medium hover:underline`}
              >
                {activeBlogIndex === index ? "Show less" : "Show more"}
              </button>

              {activeBlogIndex === index && (
                <p className={`text-gray-500 mt-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{blog.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
