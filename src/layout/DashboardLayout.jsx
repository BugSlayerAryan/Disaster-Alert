import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

const DashboardLayout = ({ children ,activeMenu}) => {
    const { user } = useUser();
    const [openSideMenu, setOpenSideMenu] = useState(false);

  return(
    <div className="bg-slate-800 min-h-screen">

        {/* Navbar component */}
        <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} activeMenu={activeMenu} />
        {user && (
            <div className="flex bg-slate-800">
                {/* Desktop Side menu - togglable */}
                {openSideMenu && (
                    <div className="hidden lg:block">
                        <SideMenu open={openSideMenu} setOpenSideMenu={setOpenSideMenu} activeMenu={activeMenu} />
                    </div>
                )}
                
                {/* Mobile side menu with overlay */}
                {openSideMenu && (
                    <>
                        <div 
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-[19]"
                            onClick={() => setOpenSideMenu(false)}
                        />
                        <div className="fixed top-[180px] left-0 w-64 h-[calc(100vh-180px)] bg-white border-r border-gray-200/50 lg:hidden z-20 overflow-y-auto animate-in slide-in-from-left duration-300">
                            <SideMenu open={openSideMenu} setOpenSideMenu={setOpenSideMenu} activeMenu={activeMenu} />
                        </div>
                    </>
                )}
                <div className="grow">{children}</div>
            </div>    
        )}
    </div>
  )
}
export default DashboardLayout;