// import React, { useState, useEffect } from "react";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import {
//   AlertCircle,
//   MapPin,
//   AlertTriangle,
//   Clock,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// export default function AdminViewHelpRequests() {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [helpRequests, setHelpRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     if (isLoaded && user) fetchHelpRequests();
//   }, [isLoaded, user]);

//   const fetchHelpRequests = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = await getToken({ template: "backend" });

//       const res = await fetch("http://localhost:8080/api/help/all", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch help requests");

//       const data = await res.json();
//       setHelpRequests(Array.isArray(data) ? data : [data]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= HELPERS ================= */
//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "RAISED":
//         return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
//       case "ACTIVE":
//       case "IN_PROGRESS":
//         return "bg-blue-500/20 text-blue-300 border-blue-500/40";
//       case "RESOLVED":
//         return "bg-green-500/20 text-green-300 border-green-500/40";
//       case "REJECTED":
//         return "bg-red-500/20 text-red-300 border-red-500/40";
//       default:
//         return "bg-slate-500/20 text-slate-300 border-slate-500/40";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toUpperCase()) {
//       case "RAISED":
//         return <Clock size={14} />;
//       case "IN_PROGRESS":
//         return <AlertCircle size={14} />;
//       case "RESOLVED":
//         return <CheckCircle size={14} />;
//       case "REJECTED":
//         return <XCircle size={14} />;
//       default:
//         return <AlertTriangle size={14} />;
//     }
//   };
//   const getStatusColorPriority = (priority = "") => {
//     switch (priority.toUpperCase()) {
//       case "HIGH":
//         return "border-red-500/40 bg-red-500/10 text-red-400";
//       case "MEDIUM":
//         return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
//       case "LOW":
//         return "border-green-500/40 bg-green-500/10 text-green-400";
//       default:
//         return "border-slate-500/40 bg-slate-500/10 text-slate-400";
//     }
//   };

//   const getStatusIconPriority = (priority = "") => {
//     const props = {
//       size: 12,
//       strokeWidth: 2,
//       className: "shrink-0",
//     };

//     switch (priority.toUpperCase()) {
//       case "HIGH":
//         return <AlertTriangle {...props} />;
//       case "MEDIUM":
//         return <AlertCircle {...props} />;
//       case "LOW":
//         return <CheckCircle {...props} />;
//       default:
//         return null;
//     }
//   };
//   /* ================= STATUS UPDATE ================= */
//   const updateStatus = async (helpId, status) => {
//     try {
//       const token = await getToken({ template: "backend" });

//       await fetch(
//         `http://localhost:8080/api/help/${helpId}/status?status=${status}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       fetchHelpRequests(); // 🔥 real-time refresh
//     } catch (err) {
//       console.error("Failed to update status", err);
//     }
//   };
//   return (
//     <>
//       {/* ===== INLINE CSS (Scrollbar Hidden) ===== */}
//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       <div className="w-full rounded-xl p-3 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-blue-900/40 shadow-2xl">
//         {/* HEADER */}
//         <div className="flex items-center justify-center gap-2 pb-2 mb-2 border-b border-blue-900/40">
//           <AlertCircle size={16} className="text-blue-400" />
//           <h2 className="text-sm font-bold tracking-wide">
//             User Help Requests
//           </h2>
//         </div>

//         {/* LOADING */}
//         {loading && (
//           <div className="flex flex-col items-center py-6">
//             <div className="h-5 w-5 animate-spin border-2 border-blue-400 border-t-transparent rounded-full" />
//             <span className="text-xs text-slate-400 mt-2">Loading...</span>
//           </div>
//         )}

//         {/* ERROR */}
//         {error && !loading && (
//           <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-2 rounded">
//             {error}
//           </div>
//         )}

//         {/* ===== VERTICAL SCROLL LIST ===== */}
//         {!loading && helpRequests.length > 0 && (
//           <div className="max-h-[620px] overflow-y-auto hide-scrollbar space-y-3 pr-1">
//             {helpRequests.map((req, index) => (
//               <div
//                 key={req.helpId || index}
//                 className="p-3 rounded-lg bg-slate-800/50 border border-slate-700"
//               >
//                 {/* TOP */}
//                 <div className="flex justify-between items-center pb-2 border-b border-slate-600/40">
//                   <span className="text-xs font-semibold text-blue-300">
//                     User ID: {req.user?.userId || "N/A"} -{" "}
//                     {req.user?.name || "Unknown User"}
//                   </span>

//                   {/* STATUS */}
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs ${getStatusColor(
//                         req.status,
//                       )}`}
//                     >
//                       {getStatusIcon(req.status)}
//                       {req.status}
//                     </div>

//                     {/* ACTION BUTTON */}
//                     {req.status === "RAISED" && (
//                       <button
//                         onClick={() => updateStatus(req.requestId, "IN_PROGRESS")}
//                         className="text-xs px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700"
//                       >
//                         Approve
//                       </button>
//                     )}

//                     {/* RESOLVE */}
//                     {req.status === "USER_CONFIRMED" && (
//                       <button
//                         onClick={() => updateStatus(req.requestId, "RESOLVED")}
//                         className="text-xs px-2 py-0.5 rounded bg-green-600 hover:bg-green-700"
//                       >
//                         Resolve
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* INFO */}
//                 <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
//                   <div className="flex gap-1">
//                     <MapPin size={12} className="text-blue-400 mt-0.5" />
//                     <span className="truncate">
//                       {req.currentLocation || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex gap-1">
//                     <AlertTriangle
//                       size={12}
//                       className="text-orange-400 mt-0.5"
//                     />
//                     <span className="truncate">{req.issueType || "N/A"}</span>
//                   </div>

//                   <div className="flex gap-1">
//                     <AlertCircle size={12} className="text-purple-400 mt-0.5" />
//                     <span className="truncate">
//                       {req.disaster?.type || "N/A"} -{" "}
//                       {req.disaster?.disasterId || "N/A"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* MESSAGE */}
//                 <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-sm line-clamp-2">
//                   {req.message || "No message"}
//                 </div>

//                 {/* FOOTER */}
//                 <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
//                   {/* Request ID */}
//                   <span className="tracking-wide">
//                     Help Request ID:{" "}
//                     <span className="text-slate-200 font-medium">
//                       {req.requestId}
//                     </span>
//                   </span>

//                   {/* Priority Badge */}
//                   <div
//                     className={`flex items-center gap-1.5 px-2.5 py-0.5
//     rounded-full border text-xs font-medium leading-none
//     ${getStatusColorPriority(req.priority)}
//   `}
//                   >
//                     <span className="flex items-center justify-center">
//                       {getStatusIconPriority(req.priority)}
//                     </span>
//                     <span className="uppercase tracking-wide">
//                       {req.priority || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EMPTY */}
//         {!loading && helpRequests.length === 0 && (
//           <div className="text-center text-xs text-slate-400 py-6">
//             No help requests found
//           </div>
//         )}

//         {/* REFRESH */}
//         <button
//           onClick={fetchHelpRequests}
//           className="w-full mt-3 py-1 text-xs font-semibold rounded bg-slate-700/60 border border-slate-600 hover:bg-slate-700"
//         >
//           🔄 Refresh
//         </button>
//       </div>
//     </>
//   );
// }


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  AlertCircle,
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
export default function AdminViewHelpRequests() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (isLoaded && user) fetchHelpRequests();
  }, [isLoaded, user]);

  const fetchHelpRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken({ template: "backend" });

      const res = await fetch(`${API_BASE_URL}/help/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch help requests");

      const data = await res.json();
      setHelpRequests(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "RAISED":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
      case "ACTIVE":
      case "IN_PROGRESS":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "RESOLVED":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "REJECTED":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/40";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "RAISED":
        return <Clock size={14} />;
      case "IN_PROGRESS":
        return <AlertCircle size={14} />;
      case "RESOLVED":
        return <CheckCircle size={14} />;
      case "REJECTED":
        return <XCircle size={14} />;
      default:
        return <AlertTriangle size={14} />;
    }
  };

  const getStatusColorPriority = (priority = "") => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return "border-red-500/40 bg-red-500/10 text-red-400";
      case "MEDIUM":
        return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
      case "LOW":
        return "border-green-500/40 bg-green-500/10 text-green-400";
      default:
        return "border-slate-500/40 bg-slate-500/10 text-slate-400";
    }
  };

  const getStatusIconPriority = (priority = "") => {
    const props = {
      size: 12,
      strokeWidth: 2,
      className: "shrink-0",
    };

    switch (priority.toUpperCase()) {
      case "HIGH":
        return <AlertTriangle {...props} />;
      case "MEDIUM":
        return <AlertCircle {...props} />;
      case "LOW":
        return <CheckCircle {...props} />;
      default:
        return null;
    }
  };

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (helpId, status) => {
    try {
      const token = await getToken({ template: "backend" });

      await fetch(`${API_BASE_URL}/help/${helpId}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchHelpRequests(); // 🔥 real-time refresh
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  /* ================= SORT HELP REQUESTS ================= */
  const statusOrder = ["RAISED", "IN_PROGRESS", "USER_CONFIRMED", "RESOLVED"];
  const sortedHelpRequests = [...helpRequests].sort((a, b) => {
    const aIndex = statusOrder.indexOf(a.status?.toUpperCase());
    const bIndex = statusOrder.indexOf(b.status?.toUpperCase());
    return aIndex - bIndex;
  });

  return (
    <>
      {/* ===== INLINE CSS (Scrollbar Hidden) ===== */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full rounded-xl p-3 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-blue-900/40 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-center gap-2 pb-2 mb-2 border-b border-blue-900/40">
          <AlertCircle size={16} className="text-blue-400" />
          <h2 className="text-sm font-bold tracking-wide">
            User Help Requests
          </h2>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center py-6">
            <div className="h-5 w-5 animate-spin border-2 border-blue-400 border-t-transparent rounded-full" />
            <span className="text-xs text-slate-400 mt-2">Loading...</span>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-2 rounded">
            {error}
          </div>
        )}

        {/* ===== VERTICAL SCROLL LIST ===== */}
        {!loading && sortedHelpRequests.length > 0 && (
          <div className="max-h-[620px] overflow-y-auto hide-scrollbar space-y-3 pr-1">
            {sortedHelpRequests.map((req, index) => (
              <div
                key={req.helpId || index}
                className="p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                {/* TOP */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-600/40">
                  <span className="text-xs font-semibold text-blue-300">
                    User ID: {req.user?.userId || "N/A"} -{" "}
                    {req.user?.name || "Unknown User"}
                  </span>

                  {/* STATUS */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs ${getStatusColor(
                        req.status
                      )}`}
                    >
                      {getStatusIcon(req.status)}
                      {req.status}
                    </div>

                    {/* ACTION BUTTON */}
                    {req.status === "RAISED" && (
                      <button
                        onClick={() =>
                          updateStatus(req.requestId, "IN_PROGRESS")
                        }
                        className="text-xs px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700"
                      >
                        Approve
                      </button>
                    )}

                    {/* RESOLVE */}
                    {req.status === "USER_CONFIRMED" && (
                      <button
                        onClick={() =>
                          updateStatus(req.requestId, "RESOLVED")
                        }
                        className="text-xs px-2 py-0.5 rounded bg-green-600 hover:bg-green-700"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="flex gap-1">
                    <MapPin size={12} className="text-blue-400 mt-0.5" />
                    <span className="truncate">{req.currentLocation || "N/A"}</span>
                  </div>

                  <div className="flex gap-1">
                    <AlertTriangle size={12} className="text-orange-400 mt-0.5" />
                    <span className="truncate">{req.issueType || "N/A"}</span>
                  </div>

                  <div className="flex gap-1">
                    <AlertCircle size={12} className="text-purple-400 mt-0.5" />
                    <span className="truncate">
                      {req.disaster?.type || "N/A"} - {req.disaster?.disasterId || "N/A"}
                    </span>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-sm line-clamp-2">
                  {req.message || "No message"}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  {/* Request ID */}
                  <span className="tracking-wide">
                    Help Request ID:{" "}
                    <span className="text-slate-200 font-medium">
                      {req.requestId}
                    </span>
                  </span>

                  {/* Priority Badge */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-0.5
                      rounded-full border text-xs font-medium leading-none
                      ${getStatusColorPriority(req.priority)}
                    `}
                  >
                    <span className="flex items-center justify-center">
                      {getStatusIconPriority(req.priority)}
                    </span>
                    <span className="uppercase tracking-wide">
                      {req.priority || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && sortedHelpRequests.length === 0 && (
          <div className="text-center text-xs text-slate-400 py-6">
            No help requests found
          </div>
        )}

        {/* REFRESH */}
        <button
          onClick={fetchHelpRequests}
          className="w-full mt-3 py-1 text-xs font-semibold rounded bg-slate-700/60 border border-slate-600 hover:bg-slate-700"
        >
          🔄 Refresh
        </button>
      </div>
    </>
  );
}
