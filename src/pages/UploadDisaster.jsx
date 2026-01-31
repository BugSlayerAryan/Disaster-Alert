const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AlertTriangle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadDisaster = () => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [formData, setFormData] = useState({
    type: "",
    location: "",
    severity: "SEVERE",
    source: "MANUAL",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const notifySuccess = (msg) =>
    toast.success(msg, { autoClose: 3000, theme: "colored" });
  const notifyError = (msg) =>
    toast.error(msg, { autoClose: 4000, theme: "colored" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !user) return notifyError("❌ Admin not logged in.");

    setLoading(true);
    try {
      const token = await getToken({ template: "backend" });
      const response = await fetch(`${API_BASE_URL}/disasters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || response.statusText);
      }

      await response.json();
      notifySuccess("✅ Disaster uploaded successfully!");
      setFormData({
        type: "",
        location: "",
        severity: "SEVERE",
        source: "MANUAL",
      });
    } catch (err) {
      console.error(err);
      const message = err.message.includes("401")
        ? "Unauthorized. Admin access required."
        : err.message.includes("403")
          ? "Forbidden. Admin access required."
          : `Error: ${err.message}`;
      notifyError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout activeMenu="Upload Disaster">
      <div className="min-h-screen bg-gray-900 flex justify-center items-start py-10 px-4 md:px-8">
        <ToastContainer position="top-right" theme="colored" />
        <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <AlertTriangle
              size={28}
              className="text-yellow-400 animate-pulse"
            />
            Upload Disaster
          </h2>
          <p className="text-gray-400 text-sm">
            Fill in the details to report a disaster accurately.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Disaster Type */}
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 font-medium">
                Disaster Type
              </label>
              <input
                type="text"
                name="type"
                placeholder="Wind, Flood..."
                value={formData.type}
                onChange={handleChange}
                required
                className="rounded-xl px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 shadow-sm"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Bhubaneswar"
                value={formData.location}
                onChange={handleChange}
                required
                className="rounded-xl px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 shadow-sm"
              />
            </div>

            {/* Severity */}
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 font-medium">Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="rounded-xl px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              >
                <option value="LOW">LOW</option>
                <option value="MODERATE">MODERATE</option>
                <option value="SEVERE">SEVERE</option>
              </select>
            </div>

            {/* Source */}
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1 font-medium">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="rounded-xl px-3 py-2 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              >
                <option value="MANUAL">MANUAL</option>
                <option value="API">API</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-2xl font-bold text-white text-lg ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-transform transform hover:scale-[1.02] shadow-md"
                }`}
              >
                {loading ? "Uploading..." : "Submit Disaster"}
              </button>
            </div>
          </form>

          <p className="text-gray-500 text-xs text-center mt-2">
            ⚠️ Ensure all information is accurate for quick response.
          </p>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UploadDisaster;
