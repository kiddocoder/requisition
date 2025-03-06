import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function AppLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />
            <Outlet />
        </div>
    )
}

export default AppLayout;
