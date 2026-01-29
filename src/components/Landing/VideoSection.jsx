export default function VideosSection() {
  return (
    <section className="bg-[#165a8a] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white mb-10">
          Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title:
                "Emotional & Mental Well-Being for Disaster Resilient Schools.",
              img: "/videos/v1.jpg",
            },
            {
              title: "YUVA AAPDA MITRA SCHEME (YAMS)",
              img: "/videos/v2.jpg",
            },
            {
              title:
                "#Heatwave | लू / गर्मी के कारण और बचाव (#SignLanguage) | NDMA",
              img: "/videos/v3.jpg",
            },
            {
              title:
                "सिविल डिफेंस शवों के सम्मानजनक निपटान",
              img: "/videos/v4.jpg",
            },
          ].map((video, i) => (
            <div key={i}>
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <img
                  src={video.img}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 w-14 h-10 rounded flex items-center justify-center">
                    <span className="text-white text-xl">▶</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-white font-medium leading-snug">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-[#165a8a] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            See All Videos
          </button>
        </div>
      </div>
    </section>
  );
}
