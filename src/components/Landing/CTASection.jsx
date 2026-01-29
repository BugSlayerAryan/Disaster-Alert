const CTASection = ({ openSignUp }) => {
  return (
    <section className="relative bg-linear-to-r from-purple-600 to-indigo-600 overflow-hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:max-w-xl text-center lg:text-left">
          <span className="block">Ready to get started?</span>
          <span className="block text-purple-200 mt-2">Create your account today</span>
        </h2>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mt-0 lg:flex-row lg:justify-start">
          {/* Primary CTA */}
          <button
            onClick={() => openSignUp()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold text-base shadow-md hover:shadow-lg hover:bg-purple-50 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 cursor-pointer"
            aria-label="Sign up"
          >
            Sign Up Now
          </button>

          {/* Optional Secondary CTA */}
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-500 bg-opacity-20 text-white font-medium text-base hover:bg-opacity-30 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 cursor-pointer"
            aria-label="Learn more"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Subtle background shapes */}
      <div className="absolute -top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-indigo-300/10 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default CTASection;

