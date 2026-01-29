import { ShieldCheck, Users, BookOpen, Cpu, Lightbulb } from "lucide-react";

const activities = [
  {
    icon: ShieldCheck,
    title: "Disaster Risk Reduction",
    desc: "Creating national guidelines, promoting safe infrastructure, and reducing vulnerability.",
  },
  {
    icon: Users,
    title: "Capacity Building",
    desc: "Training first responders, organizing mock drills, and strengthening disaster response.",
  },
  {
    icon: BookOpen,
    title: "Awareness & Education",
    desc: "Spreading knowledge through campaigns, workshops, and digital outreach.",
  },
  {
    icon: Cpu,
    title: "Research & Innovation",
    desc: "Integrating technology and data for early warning systems and efficient disaster response.",
  },
  {
    icon: Lightbulb,
    title: "Coordination & Collaboration",
    desc: "Integrating technology and data for early warning systems and efficient disaster response.",
  },
];

const resources = [
  { title: "National Plan", img: "/resources/plan.png" },
  { title: "National Policy", img: "/resources/policy.png" },
  { title: "National Guideline", img: "/resources/guideline.png" },
  { title: "Reports Studies", img: "/resources/reports.png" },
  { title: "Sign Language Videos", img: "/resources/sign.png" },
  { title: "Annual Report", img: "/resources/annual.png" },
  { title: "Hazard Atlas", img: "/resources/atlas.png" },
];

export default function ActivityAndResources() {
  return (
    <>
      {/* ================= OUR ACTIVITY ================= */}
      <section className="bg-gradient-to-l from-gray-900 via-slate-900 to-slate-800 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Our Activity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {activities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl px-6 py-8 text-center
                         shadow-sm border border-gray-200"
                >
                  <Icon size={44} className="mx-auto mb-4 text-orange-500" />
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= RESOURCES ================= */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-[#e6eaed] mb-10">
            Resources
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {resources.map((res, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 text-center
                       border border-gray-200 shadow-sm"
              >
                <div className="h-36 flex items-center justify-center mb-4">
                  <img
                    src={res.img}
                    alt={res.title}
                    className="h-full object-contain"
                  />
                </div>

                <p className="text-sm font-medium text-[#165a8a]">
                  {res.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
