
import { useState } from "react"
import {
    ShoppingCart,
    DollarSign,
    FileText,
    Users,
    Package,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    LogOut,
    Settings,
    Home,
    Menu,
    X,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const toggleSubmenu = (menu: string) => {
        if (activeMenu === menu) {
            setActiveMenu(null)
        } else {
            setActiveMenu(menu)
        }
    }

    return (
        <div className="relative">
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <div
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
                                    className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <Home className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Tableau de bord</span>}
                                </Link>
                            </li>

                            {/* Requisition */}
                            <li>
                                <button
                                    onClick={() => toggleSubmenu("requisition")}
                                    className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <div className="flex items-center">
                                        <ShoppingCart className="text-blue-600" size={20} />
                                        {isOpen && <span className="ml-3">Réquisitions</span>}
                                    </div>
                                    {isOpen && (activeMenu === "requisition" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "requisition" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/requisitions/new"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Nouvelle demande</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/requisitions/list"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
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
                                    className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <div className="flex items-center">
                                        <Package className="text-blue-600" size={20} />
                                        {isOpen && <span className="ml-3">Approvisionnement</span>}
                                    </div>
                                    {isOpen && (activeMenu === "procurement" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "procurement" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/procurement/pending"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Demandes en attente</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/procurement/pricing"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Définir les prix</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Accounting */}
                            <li>
                                <button
                                    onClick={() => toggleSubmenu("accounting")}
                                    className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <div className="flex items-center">
                                        <DollarSign className="text-blue-600" size={20} />
                                        {isOpen && <span className="ml-3">Comptabilité</span>}
                                    </div>
                                    {isOpen && (activeMenu === "accounting" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "accounting" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/accounting/review"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Révision des demandes</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/accounting/cashier"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Gestion de caisse</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/accounting/expenses"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Enregistrer dépenses</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Management */}
                            <li>
                                <button
                                    onClick={() => toggleSubmenu("management")}
                                    className="flex items-center justify-between w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <div className="flex items-center">
                                        <CheckCircle className="text-blue-600" size={20} />
                                        {isOpen && <span className="ml-3">Direction</span>}
                                    </div>
                                    {isOpen && (activeMenu === "management" ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                                </button>
                                {isOpen && activeMenu === "management" && (
                                    <ul className="pl-6 mt-2 space-y-1">
                                        <li>
                                            <Link
                                                to="/management/approval"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Approbation finale</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/management/reports"
                                                className="flex items-center p-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50"
                                            >
                                                <span>Rapports</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Reports */}
                            <li>
                                <Link
                                    to="/reports"
                                    className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <FileText className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Rapports</span>}
                                </Link>
                            </li>

                            {/* Users */}
                            <li>
                                <Link to="/users" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 group">
                                    <Users className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Utilisateurs</span>}
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/settings"
                                    className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 group"
                                >
                                    <Settings className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Paramètres</span>}
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 group">
                                    <LogOut className="text-blue-600" size={20} />
                                    {isOpen && <span className="ml-3">Déconnexion</span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Toggle button for desktop */}
            <button
                onClick={toggleSidebar}
                className="hidden md:block fixed top-4 left-64 z-50 bg-white border border-gray-200 p-1 rounded-full shadow-md transition-all duration-300"
                style={{ left: isOpen ? "15rem" : "4.5rem" }}
            >
                {isOpen ? (
                    <ChevronLeft size={20} className="text-blue-600" />
                ) : (
                    <ChevronRight size={20} className="text-blue-600" />
                )}
            </button>
        </div>
    )
}

function ChevronLeft(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M15 18l-6-6 6-6" />
        </svg>
    )
}

