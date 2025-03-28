"use client"

import { Bell, Search, User } from "lucide-react"
import { useState } from "react"

export const Header = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
    const [showNotifications, setShowNotifications] = useState(false)

    return (
        <header className="bg-white border-b border-gray-200 py-2 px-4 md:px-6 sticky top-0 z-10">
            <div className="flex justify-between items-center h-14">
                {/* Left section - Search */}
                <div className={`hidden md:flex items-center ${isSidebarOpen ? "ml-0" : "ml-0"} transition-all duration-300`}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Center - Mobile search button */}
                <div className="md:hidden">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Search size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Right section - User profile & notifications */}
                <div className="flex items-center gap-3">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 relative"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-medium">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                        <p className="text-sm font-medium">Nouvelle réquisition approuvée</p>
                                        <p className="text-xs text-gray-500 mt-1">Il y a 10 minutes</p>
                                    </div>
                                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                        <p className="text-sm font-medium">Demande en attente de validation</p>
                                        <p className="text-xs text-gray-500 mt-1">Il y a 3 heures</p>
                                    </div>
                                </div>
                                <div className="px-4 py-2 text-center">
                                    <button className="text-sm text-blue-600 hover:text-blue-800">Voir toutes les notifications</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User profile */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-3 py-1.5 hover:bg-blue-100 transition-colors cursor-pointer">
                            <User size={18} />
                            <span className="text-sm font-medium hidden sm:inline">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

