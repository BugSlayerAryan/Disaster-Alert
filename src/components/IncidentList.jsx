// export default function IncidentList() {
// const incidents = [
// { name: "Hurricane Delta", place: "Louisiana Coast", level: "SEVERE" },
// { name: "California Wildfire", place: "Los Angeles", level: "HIGH" },
// { name: "Flooding in Ohio", place: "Franklin County", level: "MODERATE" }
// ];

// return (
// <Card title="Incident List">
// {incidents.map((i, idx) => (
// <div key={idx} className="border-b border-slate-700 py-2">
// <p className="font-semibold">{i.name}</p>
// <p className="text-sm text-gray-400">{i.place}</p>
// <span className="text-xs bg-red-600 px-2 py-0.5 rounded">{i.level}</span>
// </div>
// ))}
// </Card>
// );
// }

// function Card({ title, children }) {
// return (
// <div className="bg-slate-800 rounded-xl p-4 shadow">
// <h2 className="font-semibold mb-2">{title}</h2>
// {children}
// </div>
// );
// }

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function IncidentOverview() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/disasters/active")
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  // 🎯 Severity styles (HIGH slightly stronger)
  const severityStyle = {
    SEVERE:
      "bg-red-950 text-red-300 border border-red-800 text-[11px] px-2.5 py-1",
    HIGH:
      "bg-amber-900 text-amber-200 border border-amber-700 text-[12px] px-3 py-1.5",
    MODERATE:
      "bg-yellow-950 text-yellow-300 border border-yellow-800 text-[11px] px-2.5 py-1",
    LOW:
      "bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] px-2.5 py-1",
  };

  const icon = {
    Cyclone: "🌀",
    Wildfire: "🔥",
    Flood: "💧",
    Tornado: "🌪️",
  };

  const styles = {
    overflowY: 'scroll', // Enable vertical scrolling
    overflowX: 'hidden', // Hide horizontal scroll bar
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };
  
  // Hide scrollbar for WebKit browsers (Chrome, Safari, Edge)
  const scrollbarHideCSS = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div className="w-full max-w-xl bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col">
      <style>{scrollbarHideCSS}</style>
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700 flex justify-center">
        <h2 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
          Active Incidents
        </h2>
      </div>

      {/* Incident List */}
      <div className="h-[367px] overflow-y-auto divide-y divide-slate-700 hide-scrollbar" style={styles}>
        {incidents.map((i) => (
          <div
            key={i.disasterId}
            className="px-5 py-4 flex justify-between items-center hover:bg-slate-700/40 transition"
          >
            {/* Left */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-xl">{icon[i.type] || "⚠️"}</div>

              <div>
                <p className="text-sm font-medium text-slate-100">
                  {i.type}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin size={12} className="text-red-500" />
                  {i.location}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1">
              {/* Severity */}
              <span
                className={`font-semibold rounded-md ${severityStyle[i.severity]}`}
              >
                {i.severity}
              </span>

              {/* Status (middle down of severity) */}
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded
                bg-slate-700 text-slate-300 border border-slate-600
                uppercase tracking-wide"
              >
                {i.status}
              </span>
            </div>
          </div>
        ))}

        {incidents.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">
            No active incidents
          </p>
        )}
      </div>
    </div>
  );
}
