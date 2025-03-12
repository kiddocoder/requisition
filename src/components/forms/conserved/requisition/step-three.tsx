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

export const StepThree: React.FC<StepProps> = ({ formData, calculateGrandTotal }) => {
    const renderItemTypeIcon = (type: string) => {
        switch (type) {
            case "stock":
                return <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            case "credit":
                return <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            case "cash":
                return <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            default:
                return null
        }
    }

    const getTypeLabel = (type: string): string => {
        switch (type) {
            case "stock":
                return "En Stock"
            case "credit":
                return "Crédit"
            case "cash":
                return "Paiement Cash"
            default:
                return type
        }
    }

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
                            <h3 className="font-medium text-lg">{formData.title || "Réquisition sans titre"}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={14} />
                                    <span>{formData.requisitionDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Building size={14} />
                                    <span>{formData.department}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Briefcase size={14} />
                                    <span>{formData.supplier}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
                ${formData.priority === "high"
                                        ? "bg-red-100 text-red-800"
                                        : formData.priority === "normal"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {formData.priority === "high"
                                    ? "Priorité haute"
                                    : formData.priority === "normal"
                                        ? "Priorité normale"
                                        : "Priorité basse"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unité</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PT</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.items.map((item: RequisitionItem, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            {item.designation}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.uniteMesure}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantiteRequisition}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">${item.prixUnitaire}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">${item.prixTotal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-1">
                                            {renderItemTypeIcon(item.type)}
                                            <span>{getTypeLabel(item.type)}</span>
                                            {item.type === "credit" && Number.parseInt(item.advancePayment) > 0 && (
                                                <span className="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded ml-1">
                                                    {item.advancePayment}% avance
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-sm font-medium text-right">
                                    Total:
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">${calculateGrandTotal().toFixed(2)}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {formData.comments && (
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <MessageSquare size={16} />
                            <span>Commentaires</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{formData.comments}</p>
                    </div>
                )}
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

