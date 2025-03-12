import type React from "react"
import {
    CheckCircle,
    CalendarDays,
    Building,
    Briefcase,
    MessageSquare,
    Save,
    Printer,
    Download,
    Share2,
} from "lucide-react"
import type { StepProps, RequisitionItem } from "../../../types/requisition"

export const StepThree: React.FC<StepProps> = ({ formData }) => {

    return (
        <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="text-sm text-green-700 font-medium">Prêt à soumettre</p>
                    <p className="text-sm text-green-700 mt-1">
                        Veuillez vérifier les informations ci-dessous avant de soumettre votre réquisition.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <h3 className="font-medium text-lg">{formData.titre || "Réquisition sans titre"}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={14} />
                                    <span>{formData.date}</span>
                                </div>
                                {/* <div className="flex items-center gap-1">
                                    <Building size={14} />
                                    <span>{formData.department}</span>
                                </div> */}
                                {/* <div className="flex items-center gap-1">
                                    <Briefcase size={14} />
                                    <span>{formData.supplier}</span>
                                </div> */}
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unité</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté D</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté R</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fourniseur</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData?.items?.map((item: RequisitionItem, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            {item.designation}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.uniteMesure}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantiteRequisition}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">${item.fourniseur}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            <div className="mt-8 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
                <textarea
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    rows={4}
                    placeholder="Informations supplémentaires ou instructions spéciales..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                    <Save size={18} />
                    Enregistrer comme brouillon
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                    <Printer size={18} />
                    Imprimer
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                    <Download size={18} />
                    Exporter en PDF
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                    <Share2 size={18} />
                    Partager
                </button>
            </div>
        </div>
    )
}

