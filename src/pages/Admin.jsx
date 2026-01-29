import DashboardLayout from "../layout/DashboardLayout";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ProfilePopup from "../components/ProfilePopup";

import IncidentList from "../components/IncidentList";
import LiveMap from "../components/LiveMap";
import EmergencyUpdates from "../components/EmergencyRequest";
import EvacuationCenters from "../components/EvacuationCenters";
import TasksPanel from "../components/TasksPanel";
import MessagesPanel from "../components/MessagesPanel";
import ViewUserHelpRequests from "../components/ViewUserHelpRequests";
import AdminViewHelpRequests from "../components/AdminViewHelpRequests";
export default function Dashboard() {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (!isLoaded || !user) return;

      const token = await getToken({ template: "backend" });
      console.log("Clerk Token:", token);

      const userData = {
        clerkUserId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
        location: user.addresses?.[0]?.city || "",
        role: "ROLE_USER"
      };

      const res = await fetch("http://localhost:8080/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!data.phone || !data.location) setShowPopup(true);
    };

    syncUserWithBackend();
  }, [getToken, user, isLoaded]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {showPopup && <ProfilePopup onClose={() => setShowPopup(false)} />}

      {/* ===== DASHBOARD UI ===== */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 space-y-4">
            <IncidentList />
            <EvacuationCenters />
          </div>

          <div className="col-span-6 space-y-4">
            <LiveMap />
          </div>

          <div className="col-span-3 space-y-4">
             <AdminViewHelpRequests />
            {/* <EmergencyUpdates /> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 text-center shadow">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
