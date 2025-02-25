


"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const Email = session?.user?.email;
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/GetUser");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        const user = result.allData.find(user => user.email === Email); 
        setUserData(user);
        setName(user?.name || '');
        setLocation(user?.location || '');
        setGender(user?.gender || '');
        setAge(user?.age || '');
        setProfession(user?.profession || '');
        setBio(user?.bio || '');  // Set bio from user data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    console.log(gender,age)
    
    try {
      const res = await fetch("/EditProfile/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email, // Send the email to the backend
          name,
          profilePic,
          location,
          gender,
          age,
          profession,
          bio,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
  
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError(`Error: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e]">
      <div className="relative p-0.5 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div
          className="absolute md:h-[150%] inset-0 rounded-lg animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, #1c1c1c 0%, #f2dbc6 25%, transparent 25%)",
          }}
        ></div>

        <div className="relative bg-black p-6 rounded-lg w-full max-w-md mx-auto">
          <h2 className="text-center text-white text-2xl mb-6 font-semibold">Edit Profile</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="profilePic" className="block text-white mb-2">Profile Picture</label>
              <input type="file" id="profilePic" onChange={handleProfilePicChange}
                className="w-full p-2 rounded-md bg-white text-black focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
              {profilePic && (
                <img src={profilePic} alt="Profile Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-white mb-2">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-white mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)} 
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="age" className="block text-white mb-2">Age</label>
              <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-white mb-2">Profession</label>
              <input type="text" id="profession" value={profession} onChange={(e) => setProfession(e.target.value)}
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-white mb-2">Bio</label>
              <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} 
                className="w-full p-4 rounded-md text-black bg-white focus:ring-[#c2956b] focus:border-[#c2956b] transition-all duration-200"
              ></textarea>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 rounded-md font-semibold transition-colors duration-200 ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#c2956b] hover:bg-[#a5814f] text-white"
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="text-sm text-center">
              <Link href="/profile" className="text-[#c2956b] hover:underline">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

