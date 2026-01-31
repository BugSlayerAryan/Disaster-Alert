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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ViewUserHelpRequests() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [helpRequests, setHelpRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch help requests for the logged-in user
  useEffect(() => {
    if (isLoaded && user) {
      fetchHelpRequests();
    }
  }, [isLoaded, user]);

  // Inside your component, right after fetching the help requests:
  const fetchHelpRequests = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const token = await getToken({ template: "backend" });

      const response = await fetch(`${API_BASE_URL}/help/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch help requests: ${response.status}`);
      }

      let data = await response.json();
      data = Array.isArray(data) ? data : [data];

      // 🔹 Sort by requestId descending (recent first)
      data.sort((a, b) => b.requestId - a.requestId);

      setHelpRequests(data);
      console.log("✓ Help requests loaded:", data);
    } catch (err) {
      console.error("❌ Error fetching help requests:", err);
      setError(err.message || "Failed to load help requests");
    } finally {
      setLoading(false);
    }
  };

  // Status colors and icons
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "RAISED":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/50";
      case "IN_PROGRESS":
      case "ACTIVE":
        return "bg-blue-500/20 text-blue-200 border-blue-500/50";
      case "RESOLVED":
      case "USER_CONFIRMED":
        return "bg-green-500/20 text-green-200 border-green-500/50";
      case "REJECTED":
      case "CANCELLED":
        return "bg-red-500/20 text-red-200 border-red-500/50";
      default:
        return "bg-slate-500/20 text-slate-200 border-slate-500/50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "RAISED":
        return <Clock size={16} className="text-yellow-400" />;
      case "IN_PROGRESS":
      case "ACTIVE":
        return <AlertCircle size={16} className="text-blue-400" />;
      case "USER_CONFIRMED":
        return <Clock size={16} className="text-green-400" />;
      case "RESOLVED":
      case "COMPLETED":
        return <CheckCircle size={16} className="text-green-400" />;
      case "REJECTED":
      case "CANCELLED":
        return <XCircle size={16} className="text-red-400" />;
      default:
        return <AlertTriangle size={16} className="text-slate-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "bg-red-950 text-red-300 border border-red-800";
      case "MEDIUM":
        return "bg-amber-950 text-amber-200 border border-amber-700";
      case "LOW":
        return "bg-emerald-950 text-emerald-300 border border-emerald-800";
      default:
        return "bg-slate-700 text-slate-300 border border-slate-600";
    }
  };

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : helpRequests.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < helpRequests.length - 1 ? prev + 1 : 0));
  };

  const currentRequest = helpRequests[currentIndex];
  const confirmHelp = async (helpId) => {
    try {
      const token = await getToken({ template: "backend" });

      await fetch(
        `${API_BASE_URL}/api/help/${helpId}/status?status=USER_CONFIRMED`,
        { method: "PUT", headers: { Authorization: `Bearer ${token}` } },
      );

      fetchHelpRequests(); // 🔥 real-time
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-blue-900/40 p-3 rounded-xl shadow-2xl text-white">
      {/* Header */}
      <div className="flex items-center justify-center gap-1.5 mb-2 pb-1.5 border-b border-blue-900/40">
        <AlertCircle className="text-blue-500" size={16} />
        <h2 className="text-sm font-bold tracking-wide">My Requests</h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="animate-spin h-5 w-5 border-2 border-blue-300 border-t-blue-500 rounded-full mb-1"></div>
          <span className="text-xs text-slate-300">Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-2 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-xs mb-2">
          ❌ {error}
        </div>
      )}

      {/* Main Content - Single Request View */}
      {!loading && helpRequests.length > 0 && currentRequest && (
        <div className="space-y-2">
          {/* Request Card */}
          <div className="p-2.5 bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600/60 rounded-lg">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-slate-600/40">
              {/* LEFT: Help ID */}
              <div className="flex items-center gap-1.5">
                <div className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs font-semibold text-blue-300">
                  Help Request ID:{" "}
                  {currentRequest.requestId || currentIndex + 1}
                </div>
              </div>

              {/* CENTER: STATUS */}
              <div
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${getStatusColor(
                  currentRequest.status,
                )}`}
              >
                {getStatusIcon(currentRequest.status)}
                <span className="text-xs">
                  {currentRequest.status || "UNKNOWN"}
                </span>
              </div>

              {/* RIGHT: ACTION BUTTON */}
              <div>
                {currentRequest.status === "IN_PROGRESS" && (
                  <button
                    onClick={() => confirmHelp(currentRequest.requestId)}
                    className="px-2 py-0.5 text-[11px] font-semibold rounded
        bg-emerald-600 hover:bg-emerald-700
        border border-emerald-500 transition"
                  >
                    ✅ Confirm Help
                  </button>
                )}
              </div>
            </div>

            {/* Content Grid - Compact Layout */}
            <div className="space-y-1.5">
              {/* Info Row - Location, Type, Disaster */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {/* Location */}
                <div className="flex items-start gap-1">
                  <MapPin
                    size={13}
                    className="text-blue-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-slate-400 font-semibold">LOC</p>
                    <p className="text-slate-100 font-medium truncate">
                      {currentRequest.currentLocation || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Issue Type */}
                <div className="flex items-start gap-1">
                  <AlertTriangle
                    size={13}
                    className="text-orange-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-slate-400 font-semibold">TYPE</p>
                    <p className="text-slate-100 font-medium truncate">
                      {currentRequest.issueType || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Disaster Info */}
                <div className="flex items-start gap-1">
                  <AlertCircle
                    size={13}
                    className="text-purple-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-slate-400 font-semibold">DISASTER</p>
                    <p className="text-slate-100 font-medium truncate">
                      {currentRequest.disaster?.type || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message - 2 rows */}
              <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                <div className="flex items-start gap-1.5">
                  <AlertCircle
                    size={14}
                    className="text-blue-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-blue-300 mb-0.5">
                      MESSAGE
                    </p>
                    <p className="text-sm text-slate-100 line-clamp-2 font-medium">
                      {currentRequest.message || "No message"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-600/40 mt-1">
                <div
                  className={`px-1.5 py-0.5 rounded text-xs font-semibold ${getPriorityColor(currentRequest.priority)}`}
                >
                  {currentRequest.priority === "HIGH" && "🔴"}
                  {currentRequest.priority === "MEDIUM" && "🟡"}
                  {currentRequest.priority === "LOW" && "🟢"}{" "}
                  {currentRequest.priority || "UNK"}
                </div>
                <div className="text-xs text-slate-500">
                  {currentRequest.createdAt &&
                    new Date(currentRequest.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-1.5 mt-2">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center gap-0.5 px-2 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white text-xs font-semibold rounded transition-all active:scale-95"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page Indicator */}
            <div className="flex items-center gap-0.5 flex-1 justify-center">
              {helpRequests.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-blue-500 w-4"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  title={`${idx + 1}/${helpRequests.length}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex items-center justify-center gap-0.5 px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border border-blue-500/50 text-white text-xs font-semibold rounded transition-all active:scale-95"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && helpRequests.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-4 text-slate-400">
          <AlertCircle size={28} className="mb-1 opacity-40" />
          <p className="text-center text-xs">No requests found.</p>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={fetchHelpRequests}
        disabled={loading || !user}
        className={`w-full mt-1.5 py-1 px-2 font-bold text-xs rounded transition-all ${
          loading || !user
            ? "bg-slate-600 text-slate-300 cursor-not-allowed"
            : "bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-100 hover:text-white"
        }`}
      >
        {loading ? "Loading..." : "🔄 Refresh"}
      </button>
    </div>
  );
}
