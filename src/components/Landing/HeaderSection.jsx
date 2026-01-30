
import { useState } from "react";
import { Menu, X ,AlertTriangle} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const HeaderSection = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const handleAdminClick = () => {
    if (isSignedIn) {
      navigate("/admin");
    } else {
      openSignIn({
        redirectUrl: "/admin",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-700 border-b border-slate-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
{/* Logo / Brand */}
<a
  href="/"
  className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight
             text-white hover:text-purple-400 transition"
  aria-label="Disaster Alert Home"
>
  <AlertTriangle className="text-yellow-400" size={40} />
  <span>Disaster Alert</span>
</a>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">

            {/* Admin Panel */}
            <button
              onClick={handleAdminClick}
              className="rounded-lg border border-purple-600 bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 hover:border-purple-500 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Admin Panel
            </button>

            {/* Sign In */}
            <button
              onClick={() => openSignIn()}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-700 cursor-pointer"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-slate-900 border-t border-slate-700 px-6 pt-8 pb-10 space-y-4">

          {/* Admin Panel */}
          <button
            onClick={() => {
              handleAdminClick();
              setOpen(false);
            }}
            className="block w-full rounded-lg border border-purple-600 bg-purple-700 px-4 py-3 text-center text-base font-semibold text-white hover:bg-purple-600 hover:border-purple-500 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Admin Panel
          </button>

          {/* Sign In */}
          <button
            onClick={() => {
              openSignIn();
              setOpen(false);
            }}
            className="block w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-base font-semibold text-white hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Sign In
          </button>

        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
