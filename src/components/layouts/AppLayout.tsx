import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Menu } from 'lucide-react';

function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile on mount and when resized
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className=" bg-gray-50">
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
            >
                <Menu size={20} />
            </button>

            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content */}
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"
                    }`}
            >
                <Header isSidebarOpen={isSidebarOpen} />

                <main className="p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
