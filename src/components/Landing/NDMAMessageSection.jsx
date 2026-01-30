import NarendraModi from '../../assets/Narendra Modi.png';

const NDMAMessageSection = () => {
  return (
    <section className="relative bg-slate-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Message from the Chairperson, NDMA
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            National leadership and vision towards a disaster-resilient India
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 p-6 md:p-12">

            {/* PROFILE */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <img
                src={NarendraModi}
                alt="Chairperson NDMA"
                className="w-44 sm:w-52 md:w-56 rounded-xl shadow-lg mb-4 md:mb-6 transition-transform transform hover:scale-105"
              />
              <p className="text-white font-semibold text-lg md:text-xl">
                Shri Narendra Modi
              </p>
              <p className="text-slate-400 text-sm md:text-base mt-1 leading-snug">
                Hon’ble Prime Minister of India<br />
                Chairperson, NDMA
              </p>
            </div>

            {/* MESSAGE CONTENT */}
            <div className="lg:col-span-3 text-slate-300 text-sm md:text-base leading-relaxed space-y-5 md:space-y-6">
              <p>
                The National Disaster Management Authority (NDMA), led by the
                Prime Minister, is the apex body for Disaster Management in India. 
                Established under the Disaster Management Act, 2005, it ensures 
                institutional mechanisms at National, State, and District levels.
              </p>

              <p>
                NDMA lays down policies, plans, and guidelines for effective Disaster Management, 
                promoting timely, coordinated, and well-prepared responses to both natural 
                and man-made disasters. The authority follows an integrated approach 
                based on Prevention, Mitigation, Preparedness, and Response.
              </p>

              <p>
                The Government emphasizes collective responsibility, 
                involving agencies, NGOs, private sector organizations, and citizens. 
                Technology-driven and proactive strategies support India’s journey toward 
                becoming a disaster-resilient nation.
              </p>

              <p className="font-semibold text-yellow-400 text-lg md:text-xl">
                Modi Hai Tu Munkin Hai
              </p>

              <p>
                NDMA operates through key verticals including Policy & Planning, 
                Mitigation, Operations & Communications, Information & Technology, 
                and Administration & Finance, ensuring a structured and effective approach.
              </p>

              {/* CTA */}
              <div className="pt-4 md:pt-6">
                <a
                  href="https://ndma.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    px-5 md:px-6 py-2.5 md:py-3 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white text-sm md:text-base font-medium
                    transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  "
                >
                  Learn More About NDMA
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NDMAMessageSection;
