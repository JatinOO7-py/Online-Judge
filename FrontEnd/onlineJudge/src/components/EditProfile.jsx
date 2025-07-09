import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Add Navbar component to maintain consistency
import { getUserProfile, updateUserProfile } from "../services/userService";

function EditProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "", bio: "", avatarUrl: "" });
  const [preferences, setPreferences] = useState({
    programmingLanguage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
        setProfile(data.profile);
        setPreferences(data.preferences);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: newName,
      avatarUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${newName}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ profile, preferences });
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow pt-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300">Avatar URL</label>
              <input
                type="text"
                value={profile.avatarUrl}
                readOnly
                className="w-full p-2 border rounded bg-gray-600 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-300">
                Programming Language
              </label>
              <select
                value={preferences.programmingLanguage}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    programmingLanguage: e.target.value,
                  })
                }
                className="w-full p-2 border rounded bg-gray-700 text-white"
              >
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
