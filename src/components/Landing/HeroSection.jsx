import Disaster from '../../assets/Disaster.jpeg';

const HeroSection = ({ openSignIn, openSignUp }) => {
  return (
    <div className="landing-page-content relative bg-slate-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 opacity-70 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            <span className="block">Real-Time Monitoring &</span>
            <span className="block text-red-500">Disaster Management System</span>
          </h1>

          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Monitor disasters, manage emergencies, and alert communities in real-time with our secure and reliable platform.
          </p>

          <div className="mt-10 max-w-sm sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <button
                onClick={() => openSignUp()}
                className="flex px-6 py-3 md:py-4 md:px-10 md:text-lg text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Get Started
              </button>
              <button
                onClick={() => openSignIn()}
                className="flex items-center justify-center px-6 py-3 md:py-4 md:px-10 md:text-lg text-base font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative mt-12">
          <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden">
            <img
              src={Disaster}
              alt="Disaster Management Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Dark overlay for professional feel */}
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-base sm:text-lg">
            All data is monitored and stored securely with enterprise-grade protocols, ensuring rapid response and community safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
