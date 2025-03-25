import type React from "react"
import { CheckCircle, CalendarDays, Building } from 'lucide-react'
import type { StepProps } from "../../../types/requisition"

export const StepThree: React.FC<StepProps> = ({ formData, setFormData }) => {
    const handleCommentChange = (value: string) => {
        setFormData({ ...formData, comment: value })
    }

    // Combine both arrays for display purposes
    const getAllItems = () => {
        const newItemsWithMeta = (formData.newItems || []).map(item => ({
            designation: item.name,
            uniteMesure: item._uiData?.uniteMesure || "",
            quantiteDemande: item._uiData?.quantiteDemande || ""
        }))

        const existingItemsWithMeta = (formData.items || []).map(item => ({
            designation: item._uiData?.designation || "Article existant",
            uniteMesure: item._uiData?.uniteMesure || "",
            quantiteDemande: item._uiData?.quantiteDemande || ""
        }))

        return [...newItemsWithMeta, ...existingItemsWithMeta]
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
                            <h3 className="font-medium text-lg">{formData.titre || "Réquisition sans titre"}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={14} />
                                    <span>{new Date(formData.date).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Building size={14} />
                                    <span>DAC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unité</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté D</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {getAllItems().map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            {item.designation}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.uniteMesure}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantiteDemande}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
                <textarea
                    value={formData.comment || ""}
                    onChange={(e) => handleCommentChange(e.target.value)}
                    rows={4}
                    placeholder="Informations supplémentaires ou instructions spéciales..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
            </div>
        </div>
    )
}