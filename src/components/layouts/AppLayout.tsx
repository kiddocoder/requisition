import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Sidebar from "./SideBar";
// import { Footer } from "./Footer";

function AppLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-indigo-50/30">
            <Header />
            <Sidebar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default AppLayout;
