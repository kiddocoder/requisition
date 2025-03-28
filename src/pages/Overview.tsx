import { useState } from "react";
import { RequisitionModal } from "../components/forms/requisition/RequistionModal"
import {
    Trash2,
    Edit2,
    DollarSign,
    FileText,
    Printer,
    Clock,
    Search,
} from 'lucide-react';
import { useFetchRequisitions } from "../hooks/apiFeatures/useRequisitions";



function Overview() {
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
    const { data: requisitions = [], isLoading: isReqLoading } = useFetchRequisitions()


    return (
        <>
            {/* Main Content */}
            <main className="container mx-auto p-4 md:p-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Gestion des Réquisitions</h2>
                        <p className="text-gray-600 mt-1">Créez, suivez et gérez vos demandes de réquisition</p>
                    </div>
                    <div>

                        <button
                            className="bg-blue-600 p-4 cursor-pointer text-white rounded-lg"
                            onClick={() => setIsModalOpen(true)}
                        >Nouvelle Requisition</button>
                    </div>

                </div>

                {/* Dashboard cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Total Réquisitions</p>
                                <h3 className="text-2xl font-bold mt-1">12</h3>
                            </div>
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <FileText size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Montant Approuvé</p>
                                <h3 className="text-2xl font-bold mt-1">8,250.75 $</h3>
                            </div>
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <DollarSign size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-5 border-l-4 border-amber-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">En Attente</p>
                                <h3 className="text-2xl font-bold mt-1">3</h3>
                            </div>
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                <Clock size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Requisitions */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="flex justify-between p-5 border-b">
                        <h3 className="font-semibold text-gray-800">Réquisitions Récentes</h3>

                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 flex-grow"

                            />
                            <Search className="absolute ml-3 text-gray-400" size={18} />
                        </div>

                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requisitions?.map((req: any) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{req.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.date.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.titre || "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseInt(req.total).toFixed(2)} $</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${req.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {req.status === 'approved' ? 'Approuvé' :
                                                    req.status === 'pending' ? 'En attente' : 'Rejeté'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800 mr-3">
                                                <Printer size={16} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        isReqLoading && <p className="p-8 text-center text-gray-500">Chargement de requisitions...</p>
                    }
                    {requisitions.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            Aucune réquisition trouvée. Créez une nouvelle réquisition pour commencer.
                        </div>
                    )}
                </div>
            </main>

            {isModalOpen && <RequisitionModal onClose={() => setIsModalOpen(false)} />}
        </>
    )
}

export default Overview;
