import DGRE from "../../assets/DGRE.png";
import FCI from "../../assets/FCI.jpg";
import IMD from "../../assets/IMD.png";
import Incois from "../../assets/Incois.png";
import LBSNAA from "../../assets/lbsnaa.png";
import CWC from "../../assets/CWC.png";

export default function Web() {
  const websites = [
    { name: "DGRE", img: DGRE, link: "https://www.drdo.gov.in/drdo/" },
    { name: "FSI", img: FCI, link: "https://www.fsi.nic.in/hindi/" },
    { name: "INCOIS", img: Incois, link: "https://incois.gov.in/site/index.jsp" },
    { name: "CWC", img: CWC, link: "https://www.cwc.gov.in/" },
    { name: "IMD", img: IMD, link: "https://mausam.imd.gov.in/" },
    { name: "LBSNAA", img: LBSNAA, link: "https://www.lbsnaa.gov.in/lbsnaa-sub/centre-for-disaster-management" },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 via-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-wide text-white">
          IMPORTANT WEBSITES
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {websites.map((site, i) => (
            <a
              key={i}
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                bg-white/30 
                backdrop-blur-sm
                rounded-2xl 
                p-6 
                flex flex-col items-center justify-center 
                shadow-md 
                transition 
                duration-300 
                ease-in-out 
                hover:shadow-xl 
                hover:-translate-y-2 
                hover:bg-blue-50/20
              "
            >
              <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4">
                <img
                  src={site.img}
                  alt={site.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-100 group-hover:text-blue-400 transition duration-300 text-center">
                {site.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
