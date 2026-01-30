export default function VideosSection() {
  const videos = [
    {
      title: "Emotional & Mental Well-Being for Disaster Resilient Schools.",
      embed: "https://www.youtube.com/embed/Wj6V8KtZ5Hc?si=KGgw2tSRzMG1PwXA",
    },
    {
      title: "YUVA AAPDA MITRA SCHEME (YAMS)",
      embed: "https://www.youtube.com/embed/o4Ioj5efvak?si=nvmHU7s3VIC3OUHU",
    },
    {
      title: "#Heatwave | लू / गर्मी के कारण और बचाव (#SignLanguage) | NDMA",
      embed: "https://www.youtube.com/embed/jXcNIhvOM8A?si=ZIAHnaCe0xDabAcS",
    },
    {
      title: "सिविल डिफेंस शवों के सम्मानजनक निपटान",
      embed: "https://www.youtube.com/embed/G-gBOfpQ3wc?si=x5rlDcKpA4ifyw9A",
    },
  ];

  return (
    <section className="bg-gradient-to-l from-gray-900 via-slate-900 to-slate-800 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white mb-10">Videos</h2>

        {/* Flex row with larger boxes */}
        <div className="flex justify-between gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="flex-1 group rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-video w-full">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={video.embed}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-white font-medium leading-snug group-hover:text-orange-400 transition-colors px-2">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@ndmaindiagoi/playlists"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#165a8a] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition transform duration-300"
          >
            See All Videos
          </a>
        </div>
      </div>
    </section>
  );
}
