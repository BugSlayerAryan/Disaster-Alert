export default function EvacuationCenters() {
  const centers = [
    { name: "Bayou High School", location: "Acadia Parish" },
    { name: "Lakeview Community Hall", location: "St. Landry Parish" },
    { name: "St. Mary Shelter Center", location: "Iberia Parish" },
    { name: "Central Civic Auditorium", location: "Lafayette Parish" },
    { name: "Riverbend Convention Hall", location: "Vermilion Parish" },
    { name: "Northside Emergency Shelter", location: "Calcasieu Parish" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-md">
      
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-sky-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894L9 2m6 18l5.447-2.724A2 2 0 0021 15.382V6.618a2 2 0 00-1.553-1.894L15 2M9 2v18m6-18v18"
          />
        </svg>

        <h2 className="font-semibold text-slate-100 text-base">
          Nearby Evacuation Centers
        </h2>
      </div>

      {/* Scroll Area */}
      <div
        className="space-y-2 max-h-56 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {centers.map((center, index) => (
          <div
            key={index}
            className="bg-slate-700/40 rounded-lg px-3 py-2"
          >
            <p className="font-medium text-slate-200 leading-tight">
              {center.name}
            </p>
            <p className="text-sm text-gray-400">
              {center.location}
            </p>
          </div>
        ))}
      </div>

      {/* Hide scrollbar (WebKit) */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
