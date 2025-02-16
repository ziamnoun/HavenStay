"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import withAuth from "@/utils/withAuth";

const PostPage = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  
  // New state variables for messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Email = session?.user?.email;
  const author = session?.user?.name;

  const handlePostSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    if (!title.trim() || !author.trim() || !content.trim() || !category.trim()) {
      console.log("All fields are required");
      return;
    }

    const newPost = {
      Email,
      title,
      author,
      content,
      category,
      image,
      createdAt: new Date().toISOString(),
    };

    console.log("Submitting post:", newPost); // Debug log to check the data

    try {
      const response = await fetch("/Post/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to post the content");
      }

      const savedPost = await response.json();
      console.log("Post submitted successfully:", savedPost);

      // Set success message and reset error message
      setSuccessMessage("Post submitted successfully!");
      setErrorMessage(""); 

      // Reset fields if post is successful
      setTitle("");
      setContent("");
      setCategory("");
      setImage(""); 
    } catch (error) {
      console.error("Error submitting post:", error);

      // Set error message and reset success message
      setErrorMessage("Failed to submit post. Please try again.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create a Post</h2>
        <button 
          onClick={() => {
            const newMode = !darkMode;
            setDarkMode(newMode);
            if (newMode) {
              document.documentElement.classList.add("dark");
              localStorage.setItem("theme", "dark");
            } else {
              document.documentElement.classList.remove("dark");
              localStorage.setItem("theme", "light");
            }
          }} 
          className="p-2 bg-gray-800 text-white rounded-full"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Success or Error Message */}
      {successMessage && <div className="p-2 bg-green-500 text-white mb-4">{successMessage}</div>}
      {errorMessage && <div className="p-2 bg-red-500 text-white mb-4">{errorMessage}</div>}

      {/* Post Input Box */}
      <form
        onSubmit={handlePostSubmit}
        className={`shadow-lg rounded-lg p-4 mb-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`w-full p-2 border rounded mb-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
        />
        <input
          type="text"
          value={author}
          disabled
          placeholder="Author"
          className={`w-full p-2 border rounded mb-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content..."
          className={`w-full p-2 border rounded mb-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className={`w-full p-2 border rounded mb-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image Link (Optional)"
          className={`w-full p-2 border rounded mb-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
        />
        <button 
          type="submit"
          className="w-full bg-[#c2956b] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default withAuth(PostPage);
