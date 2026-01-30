const CTASection = ({ openSignUp }) => {
  return (
    <section className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t border-slate-600/40">
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">

        {/* Heading */}
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            Disaster Preparedness & Emergency Response
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Access verified alerts, real-time updates, and official safety
            guidelines to stay informed and prepared during emergencies.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mt-0 lg:justify-start">

          {/* Primary CTA */}
          <button
            onClick={() => openSignUp()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md
            bg-blue-600 text-white font-medium text-sm
            hover:bg-blue-700 transition
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:ring-offset-slate-800"
            aria-label="Register for emergency alerts"
          >
            Register for Emergency Alerts
          </button>

          {/* Secondary CTA */}
          <a
            href="https://ndma.gov.in/ndma-guidelines"
            target="_blank"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md
            border border-slate-500/50 text-slate-200 text-sm font-medium
            hover:bg-slate-700 transition
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-800"
            aria-label="View safety guidelines"
          >
            View Safety Guidelines
          </a>
        </div>
      </div>

      {/* Subtle background accents */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-slate-400/5 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default CTASection;
