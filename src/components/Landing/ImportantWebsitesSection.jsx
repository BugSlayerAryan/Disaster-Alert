export function ImportantWebsites() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-12 tracking-wide">
          IMPORTANT WEBSITES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            { name: "DGRE", img: "/logos/dgre.png" },
            { name: "FSI", img: "/logos/fsi.png" },
            { name: "INCOIS", img: "/logos/incois.png" },
            { name: "CWC", img: "/logos/cwc.png" },
            { name: "IMD", img: "/logos/imd.png" },
            { name: "LBSNAA", img: "/logos/lbsnaa.png" },
          ].map((site, i) => (
            <div
              key={i}
              className="bg-[#f3f6f9] rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition"
            >
              <img
                src={site.img}
                alt={site.name}
                className="h-16 object-contain mb-4"
              />
              <p className="text-sm font-semibold text-gray-800">
                {site.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
