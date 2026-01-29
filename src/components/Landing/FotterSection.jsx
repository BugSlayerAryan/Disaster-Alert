// const FotterSection = () => {
//     return (
//         <footer className="bg-gray-900 text-gray-200">
//             <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="space-y-4">
//                         <h3 className="text-2xl font-extrabold text-white">CloudShare</h3>
//                         <p className="text-sm text-gray-400 max-w-sm">
//                             Securely upload, share and manage files with enterprise-grade encryption and simple collaboration tools.
//                         </p>

//                     </div>

//                     <div className="grid grid-cols-2 gap-4 md:col-span-1">
//                         <div>
//                             <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
//                             <ul className="space-y-2 text-sm text-gray-400">
//                                 <li>Features</li>
//                                 <li>Pricing</li>
//                                 <li>Docs</li>
//                                 <li>Integrations</li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
//                             <ul className="space-y-2 text-sm text-gray-400">
//                                 <li>About</li>
//                                 <li>Careers</li>
//                                 <li>Blog</li>
//                                 <li>Contact</li>
//                             </ul>
//                         </div>
//                     </div>

//                     <div>
//                         <h4 className="text-sm font-semibold text-white mb-3">Stay up to date</h4>
//                         <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for product updates and tips.</p>
//                         <form className="flex items-center w-full max-w-sm">
//                             {/* <label htmlFor="email" className="sr-only">Email address</label> */}
//                             <input id="email" type="email" placeholder="you@company.com" className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none" />
//                             <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition">Subscribe</button>
//                         </form>

//                         <div className="mt-6 flex items-center gap-4 text-2xl">
//                             <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">🐦</a>
//                             <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white">🐙</a>
//                             <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">in</a>
//                             <a href="#" aria-label="Email" className="text-gray-400 hover:text-white">✉️</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="border-t border-gray-800">
//                 <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//                     <p className="text-center text-sm text-gray-500">© 2025 CloudShare. All rights reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default FotterSection;

import {
    FaTwitter,
    FaGithub,
    FaLinkedinIn,
    FaEnvelope,
    FaInstagram,
    FaFacebookF
} from "react-icons/fa";

const FooterSection = () => {
    return (
        <footer className="relative overflow-hidden text-gray-300">

            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-gray-950 via-gray-900 to-gray-950" />

            {/* Subtle Accent Glows */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl -z-10" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl -z-10" />

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

                    {/* Brand */}
                    <div className="space-y-5">
                        <h2 className="text-3xl font-semibold text-white tracking-tight">
                            CloudShare
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-md">
                            Secure cloud storage and file sharing built for modern teams,
                            with enterprise-grade security and seamless collaboration.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-5">
                                Product
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <FooterLink href="/features" label="Features" />
                                <FooterLink href="/pricing" label="Pricing" />
                                <FooterLink href="/docs" label="Docs" />
                                <FooterLink href="/integrations" label="Integrations" />
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-5">
                                Company
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <FooterLink href="/about" label="About" />
                                <FooterLink href="/careers" label="Careers" />
                                <FooterLink href="/blog" label="Blog" />
                                <FooterLink href="/contact" label="Contact" />
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-3">
                                Stay Updated
                            </h4>
                            <p className="text-sm text-gray-400 mb-4">
                                Get product updates, security tips, and new feature releases.
                            </p>

                            <form className="flex overflow-hidden rounded-lg border border-gray-800 focus-within:ring-2 focus-within:ring-purple-600">
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    className="flex-1 bg-gray-900 px-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <SocialIcon
                                href="https://twitter.com"
                                label="Twitter"
                                icon={<FaTwitter />}
                                color="#1DA1F2"
                            />
                            <SocialIcon
                                href="https://github.com"
                                label="GitHub"
                                icon={<FaGithub />}
                                color="#ffffff"
                            />
                            <SocialIcon
                                href="https://linkedin.com"
                                label="LinkedIn"
                                icon={<FaLinkedinIn />}
                                color="#0A66C2"
                            />
                            <SocialIcon
                                href="https://instagram.com"
                                label="Instagram"
                                icon={<FaInstagram />}
                                color="#E4405F"
                            />
                            <SocialIcon
                                href="https://facebook.com"
                                label="Facebook"
                                icon={<FaFacebookF />}
                                color="#1877F2"
                            />
                            <SocialIcon
                                href="mailto:support@cloudshare.com"
                                label="Email"
                                icon={<FaEnvelope />}
                                color="#D44638"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-xs text-gray-500">
                        © 2025 CloudShare. All rights reserved.
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
            className="text-gray-400 hover:text-white transition-colors duration-200"
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
    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
    style={{ color: color }}
  >
    <span className="text-lg">{icon}</span>
  </a>
);


export default FooterSection;
