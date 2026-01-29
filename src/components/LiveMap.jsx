// export default function LiveMap() {
// return (
// <div className="bg-slate-800 rounded-xl p-4 shadow h-[420px]">
// <h2 className="font-semibold mb-2">Live Incident Map</h2>
// <div className="h-full bg-slate-700 rounded flex items-center justify-center text-gray-400">
// Map Integration (Google / Mapbox)
// </div>
// </div>
// );
// }

// import React from "react";
// import Map from "react-map-gl/mapbox";
// import { Marker } from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

// export default function LiveMap() {
//   return (
//     <div className="bg-slate-800 rounded-xl border border-slate-700 h-[420px] overflow-hidden">
//       <Map
//         mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
//         initialViewState={{
//           longitude: -122.41,
//           latitude: 37.78,
//           zoom: 11
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <Marker longitude={-122.41} latitude={37.78} color="red" />
//       </Map>
//     </div>
//   );
// }

// import React from "react";
// import { Map, Marker } from "react-map-gl/maplibre";
// import "maplibre-gl/dist/maplibre-gl.css";

// export default function LiveMap() {
//   return (
//     <div className="h-[420px] w-full rounded-xl border border-slate-700 overflow-hidden">
//       <Map
//         initialViewState={{
//           latitude: 20.5937,   // center of India
//           longitude: 78.9629,
//           zoom: 5              // zoomed out to see whole India
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=cGWkK9MIrC8p5MZZI5WQ"
//       >
//         {/* Example Marker in India */}
//         <Marker longitude={78.9629} latitude={20.5937} color="red" />
//       </Map>
//     </div>
//   );
// }


// import React from "react";
// import { Map, Marker } from "react-map-gl/maplibre";
// import "maplibre-gl/dist/maplibre-gl.css";

// export default function LiveMap() {
//   return (
//     <div className="h-[420px] w-full rounded-xl border border-slate-700 overflow-hidden">
//       <Map
//         initialViewState={{
//           latitude: 20.5937,   // center of India
//           longitude: 78.9629,
//           zoom: 5              // zoom out to show India
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=cGWkK9MIrC8p5MZZI5WQ"
//       >
//         {/* Example Marker */}
//         <Marker longitude={78.9629} latitude={20.5937} color="red" />
//       </Map>
//     </div>
//   );
// }

import React from "react";
import MapLibreGl from "maplibre-gl";
import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function LiveMap() {
  return (
    <div className="h-[420px] w-full rounded-xl border border-slate-700 overflow-hidden">
      <Map
        initialViewState={{
          latitude: 20.5937,
          longitude: 78.9629,
          zoom: 3.8, // good default
        }}
        style={{ width: "100%", height: "100%" }}
        mapLib={MapLibreGl}
        mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=cGWkK9MIrC8p5MZZI5WQ"
      >
        {/* Example marker */}
        <Marker longitude={78.9629} latitude={20.5937} color="red" />
      </Map>
    </div>
  );
}
