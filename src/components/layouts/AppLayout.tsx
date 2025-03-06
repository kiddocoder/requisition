import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

function AppLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AppLayout;
