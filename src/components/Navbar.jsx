import { Menu, Share2, Wallet, X } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import SideMenu from "./SideMenu";

const Navbar = ({ openSideMenu, setOpenSideMenu , activeMenu}) => {
    return(
        <>
        <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30">

            {/* Navbar */}
            <div className="flex items-center justify-between gap-5 backdrop-blur-[2px] py-4 px-4 sm:px-7">
                {/* Left side - menu button and branding */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        className="text-white hover:bg-slate-700 p-2 rounded-lg transition-all duration-200 hover:shadow-md flex-shrink-0"
                        title={openSideMenu ? "Close menu" : "Open menu"}
                    >
                        {openSideMenu ? (
                            <X className="text-2xl" />
                        ) : (
                            <Menu className="text-2xl" />
                        )}
                    </button>
                    <div className="flex items-center gap-2">
                        <Share2 className="text-blue-400" size={24} />
                        <span className="text-base font-semibold text-white truncate">DISASTER MANAGEMENT SYSTEM</span>
                    </div>
                </div>

                {/* Right side - user button */}
                <SignedIn>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <UserButton />
                        </div>
                    </div>
                </SignedIn>
            </div>
        </div>

        </>
    )
}
export default Navbar;