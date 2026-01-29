import { useUser } from "@clerk/clerk-react";
import { User, X } from "lucide-react";
import React from "react";
import { SIDE_MENU_DATA } from "../assets/data";
import { useNavigate } from "react-router-dom";

const SideMenu = ({activeMenu, open, setOpenSideMenu}) => {
    const {user} = useUser();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        // Close mobile menu after navigation
        if (setOpenSideMenu) {
            setOpenSideMenu(false);
        }
    };

    return (
        <div className="w-64 h-[calc(100vh-180px)] bg-slate-800 border-r border-slate-700 p-5 sticky top-[180px] z-20 overflow-y-auto">
            {/* Close button for mobile */}
            <button 
                onClick={() => setOpenSideMenu?.(false)}
                className="lg:hidden w-full flex justify-end mb-3 text-slate-300 hover:bg-slate-700 p-2 rounded-lg transition-colors"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 ">
                {
                    user?.imageUrl? (
                        <img src={user?.imageUrl || ""} alt="Profile image" className="w-20 h-20 bg-slate-600 rounded-full object-cover border-2 border-slate-600" />
                    )
                     : 
                    (
                        <User className="w-20 h-20 text-slate-400" />
                    )
                }
                <h5 className="text-white font-medium leading-6">
                    {user?.fullName || "User"}
                </h5>
            </div>
            {SIDE_MENU_DATA.map((item, index) =>(
                <button 
                        key={`menu_${index}`} 
                        className={`w-full flex items-center gap-4 text-[15px] py-3 px-3 rounded-lg mb-3 transition-all duration-200 cursor-pointer ${activeMenu === item.label ? 'bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                        onClick={() => handleNavigate(item.path)}
                        >
                    <item.icon className="text-lg" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
