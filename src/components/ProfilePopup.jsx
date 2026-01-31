const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function ProfilePopup({ onClose }) {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!isSignedIn) return setError("You are not signed in.");
    if (!phone || !location) return setError("Phone and location are required.");

    try {
      const token = await getToken({ template: "backend" });

await axios.put(
  `${API_BASE_URL}/api/users/update-profile`,
  { clerkUserId: user?.id, phone, location },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      onClose(); // close popup on success
    } catch (err) {
      console.error("Failed to save profile", err);
      setError("Failed to save profile. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-gray-500 mb-4">We need this information for emergency response</p>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
