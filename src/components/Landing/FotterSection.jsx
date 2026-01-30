

import {
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden text-slate-300">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Subtle Accent Glows */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl -z-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* Brand */}
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-white tracking-tight">
              Disaster Alert
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              A centralized disaster management and emergency response platform
              providing verified alerts, preparedness resources, and real-time
              situational awareness for citizens and authorities.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-5">
                Platform
              </h4>
              <ul className="space-y-3 text-sm">
                <FooterLink href="/alerts" label="Emergency Alerts" />
                <FooterLink href="/disasters" label="Active Disasters" />
                <FooterLink href="/guidelines" label="Safety Guidelines" />
                <FooterLink href="/resources" label="Relief Resources" />
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-5">
                Organization
              </h4>
              <ul className="space-y-3 text-sm">
                <FooterLink href="/about" label="About the Platform" />
                <FooterLink href="/authorities" label="Authorities & Partners" />
                <FooterLink href="/reports" label="Incident Reports" />
                <FooterLink href="/contact" label="Contact & Support" />
              </ul>
            </div>
          </div>

          {/* Updates & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-3">
                Alerts & Updates
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                Subscribe to receive important notifications, advisories,
                and system updates.
              </p>

              <form className="flex overflow-hidden rounded-lg border border-slate-700 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-slate-900 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social / Contact */}
            <div className="flex flex-wrap items-center gap-4">
              <SocialIcon
                href="https://twitter.com"
                label="Twitter"
                icon={<FaTwitter />}
                color="#1DA1F2"
              />
              <SocialIcon
                href="https://linkedin.com"
                label="LinkedIn"
                icon={<FaLinkedinIn />}
                color="#0A66C2"
              />
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                icon={<FaFacebookF />}
                color="#1877F2"
              />
              <SocialIcon
                href="mailto:support@disastersafe.gov"
                label="Email"
                icon={<FaEnvelope />}
                color="#38BDF8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-slate-500">
            © 2026 Disaster Alert. Developed for public safety and
            emergency preparedness.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* Reusable Footer Link */
const FooterLink = ({ href, label }) => (
  <li>
    <a
      href={href}
      className="text-slate-400 hover:text-white transition-colors duration-200"
    >
      {label}
    </a>
  </li>
);

/* Social Icon Button */
const SocialIcon = ({ href, icon, label, color }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full 
    bg-slate-900 hover:bg-slate-800 transition 
    focus:outline-none focus:ring-2 focus:ring-blue-500"
    style={{ color }}
  >
    <span className="text-lg">{icon}</span>
  </a>
);

export default FooterSection;
