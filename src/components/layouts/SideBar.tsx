"use client"

import { useState } from "react"
import { ShoppingCart, Package, ChevronDown, ChevronRight, LogOut, Settings, Home, ChevronLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
}

export const SideBar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const location = useLocation()

    const toggleSubmenu = (menu: string) => {
        if (activeMenu === menu) {
            setActiveMenu(null)
        } else {
            setActiveMenu(menu)
        }
    }

    const isActive = (path: string) => {
        return location.pathname.startsWith(path)
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40
          ${isOpen ? "w-64" : "w-0 md:w-20"} 
          overflow-hidden
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 bg-blue-700 text-white">
                        {isOpen ? (
                            <h1 className="text-xl font-bold">ReqSystem</h1>
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <ShoppingCart size={24} />
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <ul className="space-y-2">
                            {/* Dashboard */}
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center p-2 rounded-lg group ${isActive("/dashboard") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                >
                                    <Home className={isActive("/dashboard") ? "text-blue-700" : "text-blue-600"} size={20} />
                                    {isOpen && <span className="ml-3">Tableau de bord</span>}
                                </Link>
                            </li>

                            {/* Requisition */}
                            <li>
                                <button
                                    onClick={() => toggleSubmenu("requisition")}
                                    className={`flex items-center justify-between w-full p-2 rounded-lg group ${isActive("/requisitions") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <ShoppingCart className={isActive("/requisitions") ? "text-blue-700" : "text-blue-600"} size={20} />
                                        {isOpen && <span className="ml-3">Réquisitions</span>}
                                    </div>
                                    {isOpen && (activeMenu === "requisition" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "requisition" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/requisitions/new"
                                                className={`flex items-center p-2 text-sm rounded-lg ${isActive("/requisitions/new")
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <span>Nouvelle demande</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/requisitions/list"
                                                className={`flex items-center p-2 text-sm rounded-lg ${isActive("/requisitions/list")
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <span>Mes demandes</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Procurement */}
                            <li>
                                <button
                                    onClick={() => toggleSubmenu("procurement")}
                                    className={`flex items-center justify-between w-full p-2 rounded-lg group ${isActive("/procurement") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <Package className={isActive("/procurement") ? "text-blue-700" : "text-blue-600"} size={20} />
                                        {isOpen && <span className="ml-3">Approvisionnement</span>}
                                    </div>
                                    {isOpen && (activeMenu === "procurement" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "procurement" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/procurement/pending"
                                                className={`flex items-center p-2 text-sm rounded-lg ${isActive("/procurement/pending")
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <span>Demandes en attente</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/procurement/pricing"
                                                className={`flex items-center p-2 text-sm rounded-lg ${isActive("/procurement/pricing")
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "text-gray-700 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <span>Définir les prix</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Other menu items... */}
                            {/* You can add the rest of your menu items following the same pattern */}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/settings"
                                    className={`flex items-center p-2 rounded-lg ${isActive("/settings") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                                        }`}
                                >
                                    <Settings className={isActive("/settings") ? "text-blue-700" : "text-blue-600"} size={20} />
                                    {isOpen && <span className="ml-3">Paramètres</span>}
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-50">
                                    <LogOut className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Déconnexion</span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Toggle button for desktop */}
            <button
                onClick={toggleSidebar}
                className="hidden md:flex fixed z-50 bg-white border border-gray-200 p-1.5 rounded-full shadow-md transition-all duration-300 items-center justify-center"
                style={{
                    left: isOpen ? "15.5rem" : "4.5rem",
                    top: "5rem",
                }}
            >
                {isOpen ? (
                    <ChevronLeft size={18} className="text-blue-600" />
                ) : (
                    <ChevronRight size={18} className="text-blue-600" />
                )}
            </button>
        </>
    )
}

