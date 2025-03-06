import { User } from "lucide-react";


export const Header = () => {

    return (
        <header className="bg-white py-4 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-800">GestionRéq</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-3 py-1">
                        <User size={16} />
                        <span className="text-sm font-medium">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

