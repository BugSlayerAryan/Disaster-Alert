// import React, { useState, useEffect } from "react";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { AlertCircle, MapPin, Phone, AlertTriangle, Send } from "lucide-react";

// // Get current logged-in user from Clerk
// const getCurrentUser = (clerkUser) => {
//   if (!clerkUser) {
//     return {
//       userId: null,
//       name: "Guest",
//       location: ""
//     };
//   }

//   return {
//     userId: clerkUser.id,
//     name: clerkUser.fullName || clerkUser.username || "User",
//     location: clerkUser.publicMetadata?.location || ""
//   };
// };

// // Example Active Incidents (you can fetch this from API instead)
// const activeIncidents = [
//   { disasterId: 1, type: "Cyclone", location: "Dhenkanal", severity: "HIGH" },
//   { disasterId: 2, type: "Cyclone", location: "Bhubaneswar", severity: "HIGH" },
//   { disasterId: 3, type: "Flame", location: "Bhubaneswar", severity: "MEDIUM" }
// ];

// export default function SendHelpRequestPanel() {
//   const { user: clerkUser, isLoaded } = useUser();
//   const { getToken } = useAuth();
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState("");
//   const [issueType, setIssueType] = useState("");
//   const [message, setMessage] = useState("");
//   const [priority, setPriority] = useState("HIGH");
//   const [selectedDisaster, setSelectedDisaster] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [filteredIncidents, setFilteredIncidents] = useState([]);
//   const [noDisasterFound, setNoDisasterFound] = useState(false);

//   useEffect(() => {
//     if (isLoaded) {
//       const user = getCurrentUser(clerkUser);
//       setLoggedInUser(user);
//     }
//   }, [isLoaded, clerkUser]);

//   // Filter incidents based on location
//   useEffect(() => {
//     if (currentLocation.trim() === "") {
//       setFilteredIncidents([]);
//       setNoDisasterFound(false);
//       setSelectedDisaster(null);
//       return;
//     }

//     const matching = activeIncidents.filter((incident) =>
//       incident.location.toLowerCase().includes(currentLocation.toLowerCase())
//     );

//     if (matching.length === 0) {
//       setFilteredIncidents([]);
//       setNoDisasterFound(true);
//       setSelectedDisaster(null);
//     } else {
//       setFilteredIncidents(matching);
//       setNoDisasterFound(false);
//       setSelectedDisaster(matching[0]); // Auto-select first match
//     }
//   }, [currentLocation]);

//   async function sendHelpRequest() {
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!currentLocation || !selectedDisaster || !issueType) {
//       setErrorMsg("Please fill in all required fields!");
//       return;
//     }

//     const requestBody = {
//       currentLocation,
//       issueType,
//       message,
//       priority,
//       user: { userId: loggedInUser?.userId },
//       disaster: { disasterId: selectedDisaster.disasterId }
//     };

//     setLoading(true);
//     try {
//       console.log("=== HELP REQUEST DEBUG ===");
//       console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      
//       // Get Clerk token for authentication
//       let token = null;
//       try {
//         token = await getToken({ template: "backend" });
//         console.log("✓ Token obtained successfully");
//         console.log("Token preview:", token ? token.substring(0, 50) + "..." : "null");
//       } catch (tokenError) {
//         console.error("✗ Token error:", tokenError);
//         setErrorMsg("❌ Authentication failed. Please try logging in again.");
//         setLoading(false);
//         return;
//       }

//       const backendUrl = "http://localhost:8080/api/help/request";
//       console.log("Sending to:", backendUrl);
//       console.log("Headers:", {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token ? "✓ PRESENT" : "✗ MISSING"}`
//       });

//       const response = await fetch(backendUrl, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody)
//       });

//       console.log("Response Status:", response.status, response.statusText);
//       console.log("Response Headers:", response.headers);

//       if (!response.ok) {
//         let errorData = {};
//         try {
//           errorData = await response.json();
//         } catch (parseError) {
//           const text = await response.text();
//           console.error("Response text:", text);
//         }
        
//         console.error("API Error Response:", errorData);
//         const errorMsg = errorData.message || errorData.error || response.statusText;
//         throw new Error(`Server returned ${response.status}: ${errorMsg}`);
//       }

//       const data = await response.json();
//       console.log("✓ Success! Response:", data);
//       setSuccessMsg("🎉 Emergency request sent successfully!");
      
//       // Reset form
//       setCurrentLocation("");
//       setIssueType("");
//       setMessage("");
//       setPriority("HIGH");
//       setSelectedDisaster(null);
//       setTimeout(() => setSuccessMsg(""), 3000);
      
//     } catch (error) {
//       console.error("=== FULL ERROR ===");
//       console.error("Error Name:", error.name);
//       console.error("Error Message:", error.message);
//       console.error("Error Stack:", error.stack);
//       console.error("=================");

//       // Provide specific error messages
//       if (error.message.includes("Failed to fetch")) {
//         setErrorMsg(
//           "❌ Backend Connection Failed\n\n" +
//           "Possible causes:\n" +
//           "1. Backend is not running on http://localhost:8080\n" +
//           "2. CORS policy blocking the request\n" +
//           "3. Network/firewall issue\n\n" +
//           "Check browser console for details."
//         );
//       } else if (error.message.includes("401") || error.message.includes("Unauthorized")) {
//         setErrorMsg("❌ Authentication failed. Invalid or expired token.");
//       } else if (error.message.includes("400")) {
//         setErrorMsg("❌ Invalid request data. Please check all fields.");
//       } else if (error.message.includes("500")) {
//         setErrorMsg("❌ Server error. Please try again later.");
//       } else {
//         setErrorMsg(`❌ Error: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   const getPriorityColor = (pri) => {
//     switch (pri) {
//       case "HIGH":
//         return "border-red-500 bg-red-50/10";
//       case "MEDIUM":
//         return "border-yellow-500 bg-yellow-50/10";
//       case "LOW":
//         return "border-green-500 bg-green-50/10";
//       default:
//         return "border-slate-500";
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-red-900/30 p-6 rounded-2xl shadow-2xl text-white">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-900/30">
//         <AlertCircle className="text-red-500" size={28} />
//         <h2 className="text-2xl font-bold tracking-wide">Emergency Help Request</h2>
//       </div>

//       {/* User Info */}
//       {loggedInUser && (
//         <div className="mb-6 p-4 bg-slate-700/40 rounded-lg border border-slate-600/50">
//           <p className="text-sm text-slate-300">
//             <span className="text-slate-400">Requesting as:</span>{" "}
//             <span className="font-semibold text-white">{loggedInUser.name}</span>
//           </p>
//         </div>
//       )}

//       {/* Messages */}
//       {successMsg && (
//         <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
//           {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
//           {errorMsg}
//         </div>
//       )}

//       {/* Form Grid */}
//       <div className="space-y-4 mb-6">
//         {/* Current Location */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-slate-200 flex items-center gap-2">
//             <MapPin size={16} className="text-blue-400" />
//             Your Current Location <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={currentLocation}
//             onChange={(e) => setCurrentLocation(e.target.value)}
//             placeholder="Enter your location (e.g., Bhubaneswar, Dhenkanal)"
//             className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//           />
//         </div>

//         {/* No Disaster Found Notification */}
//         {noDisasterFound && currentLocation.trim() !== "" && (
//           <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg flex items-start gap-3">
//             <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-yellow-200 font-semibold">No Active Disaster at Your Location</p>
//               <p className="text-xs text-yellow-300 mt-1">We don't have any active incidents in {currentLocation}. Please check your location or contact emergency services directly.</p>
//             </div>
//           </div>
//         )}

//         {/* Active Incident Selection - Only show if disasters found */}
//         {filteredIncidents.length > 0 && (
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-slate-200 flex items-center gap-2">
//               <AlertTriangle size={16} className="text-orange-400" />
//               Available Incidents at Your Location <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={selectedDisaster?.disasterId || ""}
//               onChange={(e) => {
//                 const disaster = filteredIncidents.find(d => d.disasterId === parseInt(e.target.value));
//                 setSelectedDisaster(disaster);
//               }}
//               className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//             >
//               <option value="">-- Select an incident --</option>
//               {filteredIncidents.map((incident) => (
//                 <option key={incident.disasterId} value={incident.disasterId} className="bg-slate-800">
//                   ID: {incident.disasterId} | {incident.type} • {incident.location} • {incident.severity}
//                 </option>
//               ))}
//             </select>
//             {selectedDisaster && (
//               <p className="text-xs text-slate-400 mt-2">
//                 ✓ Selected: Disaster ID <span className="font-semibold text-orange-400">{selectedDisaster.disasterId}</span>
//               </p>
//             )}
//           </div>
//         )}

//         {/* Issue Type - Text Input */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-slate-200 flex items-center gap-2">
//             <AlertCircle size={16} className="text-purple-400" />
//             Issue Type <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             placeholder="e.g., Injured, Trapped, Food, Medical Emergency"
//             className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//           />
//         </div>

//         {/* Message Box */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-slate-200 flex items-center gap-2">
//             💬 Additional Message
//           </label>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Provide any additional details about your situation (optional)"
//             rows="3"
//             className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
//           />
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-slate-200">Priority Level <span className="text-red-500">*</span></label>
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             className={`w-full px-3 py-2 bg-slate-700/50 border-2 rounded-lg text-white focus:outline-none focus:ring-2 transition text-sm ${getPriorityColor(priority)}`}
//           >
//             <option value="HIGH" className="bg-slate-800">🔴 HIGH - Critical/Life Threatening</option>
//             <option value="MEDIUM" className="bg-slate-800">🟡 MEDIUM - Urgent</option>
//             <option value="LOW" className="bg-slate-800">🟢 LOW - Non-Emergency</option>
//           </select>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={sendHelpRequest}
//         disabled={loading}
//         className={`w-full py-3 px-4 font-bold text-lg rounded-lg transition-all flex items-center justify-center gap-2 ${
//           loading
//             ? "bg-slate-600 text-slate-300 cursor-not-allowed"
//             : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
//         }`}
//       >
//         {loading ? (
//           <>
//             <div className="animate-spin h-5 w-5 border-2 border-slate-300 border-t-slate-100 rounded-full"></div>
//             Sending Request...
//           </>
//         ) : (
//           <>
//             <Send size={20} />
//             Send Help Request
//           </>
//         )}
//       </button>

//       {/* Info Footer */}
//       <p className="text-xs text-slate-500 text-center mt-4">
//         ⚠️ Provide accurate location for faster response. Emergency services are available 24/7.
//       </p>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { AlertCircle, MapPin, Phone, AlertTriangle, Send } from "lucide-react";

// Helper to get logged-in user info from Clerk
const getCurrentUser = (clerkUser) => {
  if (!clerkUser) {
    return {
      userId: null,
      name: "Guest",
      location: ""
    };
  }

  return {
    userId: clerkUser.id,
    name: clerkUser.fullName || clerkUser.username || "User",
    location: clerkUser.publicMetadata?.location || ""
  };
};

// Example active incidents (replace with API fetch in production)
const activeIncidents = [];

export default function SendHelpRequestPanel() {
  const { user: clerkUser, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [noDisasterFound, setNoDisasterFound] = useState(false);
  const [allIncidents, setAllIncidents] = useState([]);

  // Load logged-in user info
  useEffect(() => {
    if (isLoaded) {
      const user = getCurrentUser(clerkUser);
      setLoggedInUser(user);
    }
  }, [isLoaded, clerkUser]);

  // Fetch active incidents from API
  useEffect(() => {
    fetch("http://localhost:8080/api/disasters/active")
      .then((res) => res.json())
      .then(setAllIncidents)
      .catch((err) => console.error("Failed to fetch incidents:", err));
  }, []);

  // Filter incidents by location
  useEffect(() => {
    if (currentLocation.trim() === "") {
      setFilteredIncidents([]);
      setNoDisasterFound(false);
      setSelectedDisaster(null);
      return;
    }

    const matching = allIncidents.filter((incident) =>
      incident.location.toLowerCase().includes(currentLocation.toLowerCase())
    );

    if (matching.length === 0) {
      setFilteredIncidents([]);
      setNoDisasterFound(true);
      setSelectedDisaster(null);
    } else {
      setFilteredIncidents(matching);
      setNoDisasterFound(false);
      setSelectedDisaster(matching[0]);
    }
  }, [currentLocation]);

  // Priority color helper
  const getPriorityColor = (pri) => {
    switch (pri) {
      case "HIGH":
        return "border-red-500 bg-red-50/10";
      case "MEDIUM":
        return "border-yellow-500 bg-yellow-50/10";
      case "LOW":
        return "border-green-500 bg-green-50/10";
      default:
        return "border-slate-500";
    }
  };

  // Send Help Request (fixed for backend)
  async function sendHelpRequest() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!currentLocation || !selectedDisaster || !issueType) {
      setErrorMsg("Please fill in all required fields!");
      return;
    }

    // ❌ Remove user from request body; backend uses JWT to attach user
    const requestBody = {
      currentLocation,
      issueType,
      message,
      priority,
      disaster: { disasterId: selectedDisaster.disasterId }
    };

    setLoading(true);

    let token = null;
    try {
      token = await getToken({ template: "backend" });
      console.log("✓ Token obtained:", token ? token.substring(0, 50) + "..." : "null");
    } catch (err) {
      console.warn("⚠️ Could not get token. Sending request without token for testing.");
    }

    const backendUrl = "/api/help/request";
    console.log("➡ Sending POST request to:", backendUrl);
    console.log("Request body:", requestBody);

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(requestBody)
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          const text = await response.text();
          console.warn("Response text:", text);
        }

        const errorMsg = errorData.message || errorData.error || response.statusText;
        throw new Error(`Server returned ${response.status}: ${errorMsg}`);
      }

      const data = await response.json();
      console.log("✅ Success:", data);
      setSuccessMsg("🎉 Help request sent successfully!");

      // Reset form
      setCurrentLocation("");
      setIssueType("");
      setMessage("");
      setPriority("HIGH");
      setSelectedDisaster(null);

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("❌ Full Error:", error);
      if (error.message.includes("Failed to fetch")) {
        setErrorMsg(
          "Backend connection failed. Check if your server is running and CORS is enabled."
        );
      } else if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        setErrorMsg("Authentication failed. Invalid or expired token.");
      } else {
        setErrorMsg(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-red-900/30 p-5 rounded-2xl shadow-2xl text-white">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-red-900/30">
        <AlertCircle className="text-red-500" size={20} />
        <h2 className="text-lg font-bold tracking-wide whitespace-nowrap">Emergency Help Request</h2>
      </div>

      {/* User Info */}
      {loggedInUser && (
        <div className="mb-3 p-3 bg-slate-700/40 rounded-lg border border-slate-600/50">
          <p className="text-xs text-slate-300">
            <span className="text-slate-400">Requesting as:</span>{" "}
            <span className="font-semibold text-white">{loggedInUser.name}</span>
          </p>
        </div>
      )}

      {/* Messages */}
      {successMsg && (
        <div className="mb-2 p-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-xs">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-2 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <div className="space-y-3 mb-4">
        {/* Current Location */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-200 flex items-center gap-2">
            <MapPin size={14} className="text-blue-400" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="e.g., Bhubaneswar, Dhenkanal"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* No Disaster Found */}
        {noDisasterFound && currentLocation.trim() !== "" && (
          <div className="p-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg flex items-start gap-2">
            <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-200 font-semibold text-xs">No Active Disaster</p>
              <p className="text-xs text-yellow-300 mt-0.5">No incidents in {currentLocation}. Contact emergency services.</p>
            </div>
          </div>
        )}

        {/* Active Incident Selection */}
        {filteredIncidents.length > 0 && (
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-200 flex items-center gap-2">
              <AlertTriangle size={14} className="text-orange-400" />
              Incident <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedDisaster?.disasterId || ""}
              onChange={(e) => {
                const disaster = filteredIncidents.find(d => d.disasterId === parseInt(e.target.value));
                setSelectedDisaster(disaster);
              }}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            >
              <option value="">-- Select incident --</option>
              {filteredIncidents.map((incident) => (
                <option key={incident.disasterId} value={incident.disasterId} className="bg-slate-800">
                  ID: {incident.disasterId} | {incident.type} • {incident.location}
                </option>
              ))}
            </select>
            {selectedDisaster && (
              <p className="text-xs text-slate-400 mt-1">
                ✓ ID: <span className="font-semibold text-orange-400">{selectedDisaster.disasterId}</span>
              </p>
            )}
          </div>
        )}

        {/* Issue Type */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-200 flex items-center gap-2">
            <AlertCircle size={14} className="text-purple-400" />
            Issue Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            placeholder="e.g., Injured, Trapped, Food"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        {/* Message Box */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-200 flex items-center gap-2">
            💬 Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Additional details (optional)"
            rows="2"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-200">Priority <span className="text-red-500">*</span></label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`w-full px-3 py-2 bg-slate-700/50 border-2 rounded-lg text-white focus:outline-none focus:ring-2 transition text-xs ${getPriorityColor(priority)}`}
          >
            <option value="HIGH" className="bg-slate-800">🔴 HIGH</option>
            <option value="MEDIUM" className="bg-slate-800">🟡 MEDIUM</option>
            <option value="LOW" className="bg-slate-800">🟢 LOW</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={sendHelpRequest}
        disabled={loading}
        className={`w-full py-2 px-4 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 ${
          loading
            ? "bg-slate-600 text-slate-300 cursor-not-allowed"
            : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-slate-300 border-t-slate-100 rounded-full"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Request
          </>
        )}
      </button>

      {/* Footer Info */}
      <p className="text-xs text-slate-500 text-center mt-2">
        ⚠️ Accurate location = faster response
      </p>
    </div>
  );
}
