"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

const Profile = () => {
    const { data: session, status } = useSession();
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);  // To handle any errors

    const Email = session?.user?.email; // Get the email from session

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("/api/GetUser");  // API to get all users
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await res.json();
          // Assuming result.allData is an array of users, find the user matching the session email
          const user = result.allData.find(user => user.email === Email); 
          setUserData(user);  // Set the found user data
        } catch (err) {
          setError(err.message);  // Set the error message if fetching fails
        } finally {
          setLoading(false);  // Set loading to false once fetching is done
        }
      };

      fetchData();
    }, [Email]);  // Dependency on Email to fetch data when session email changes

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    if (status === "loading" || loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-[#c2956b]">Loading...</p>
            </div>
        );
    }

    if (!session || !userData) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-[#c2956b]">Please log in to see your profile.</p>
            </div>
        );
    }

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-[#c2956b]">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="absolute top-6 right-6 px-4 py-2 bg-gray-400 dark:bg-[#c2956b] text-gray-800 dark:text-gray-900 rounded-full transition duration-300 flex items-center shadow-md"
            >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-300 dark:border-[#c2956b] p-8 transition duration-300">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-0">
                        {userData.image ? (
                            <img
                                src={userData.image}
                                alt="Profile"
                                className="w-full h-full rounded-full border-4 border-gray-300 dark:border-[#c2956b] shadow-lg"
                            />
                        ) : (
                            <FaUserCircle className="w-full h-full text-gray-400 dark:text-[#c2956b]" />
                        )}
                    </div>

                    <div className="ml-6 text-center md:text-left">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-[#c2956b]">
                            {userData.name || "Unknown User"}
                        </h2>
                        <p className="text-gray-500 dark:text-[#c2956b] text-sm">
                            {userData.email}
                        </p>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center">
                            <p className="flex items-center text-gray-600 dark:text-[#c2956b]">
                                <FaEnvelope className="mr-2 text-gray-500 dark:text-[#c2956b]" /> {userData.email}
                            </p>
                        </div>
                        <p className="text-gray-600 dark:text-[#c2956b] mt-2">ID: {userData._id}</p>
                        <p className="text-gray-600 dark:text-[#c2956b] mt-2">Gender: {userData.gender || "Not specified"}</p>
                        <p className="text-gray-600 dark:text-[#c2956b] mt-2">Location: {userData.location || "Not specified"}</p>
                        <p className="text-gray-600 dark:text-[#c2956b] mt-2">Profession: {userData.profession || "Not specified"}</p>
                        <p className="text-gray-600 dark:text-[#c2956b] mt-2">Bio: {userData.bio || "Not provided"}</p>

                        <Link href="/EditProfile">
                            <button className="mt-6 md:mt-8 group bg-transparent relative inline-block overflow-hidden rounded border border-gray-700 dark:border-[#c2956b] px-12 py-3 text-sm font-medium text-gray-700 dark:text-[#c2956b] hover:text-[#c2956b] dark:hover:text-white focus:outline-none focus:ring active:bg-[#c2956b] active:text-white">
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-[#c2956b] transition-all duration-500 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-[#c2956b] transition-all duration-500 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-[#c2956b] transition-all duration-500 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-[#c2956b] transition-all duration-500 group-hover:h-full"></span>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
