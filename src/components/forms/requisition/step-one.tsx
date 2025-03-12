import type React from "react"
import { useState } from "react"
import { Package } from "lucide-react"
import { FormErrors, RequisitionItem, StepProps } from "../../../types/requisition"

export const StepOne: React.FC<StepProps> = ({ formData, setFormData }) => {

    const [itemErrors, setItemErrors] = useState<FormErrors>({})


    const handleInputChange = (field: keyof RequisitionItem, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-2 space-y-2 border border-gray-100">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Package size={18} className="text-blue-600" />
                    Informations de la réquisition
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Object *</label>
                        <input
                            type="text"
                            value={formData.objet}
                            onChange={(e) => handleInputChange("objet", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.objet ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.objet && <p className="text-red-500 text-xs mt-1">{itemErrors.objet}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de la réquisition *</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.date ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.date && <p className="text-red-500 text-xs mt-1">{itemErrors.date}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la réquisition *</label>
                    <input
                        type="text"
                        value={formData.titre}
                        onChange={(e) => handleInputChange("titre", e.target.value)}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.titre ? "border-red-500" : "border-gray-300"}`}
                    />
                    {itemErrors.titre && <p className="text-red-500 text-xs mt-1">{itemErrors.titre}</p>}
                </div>
            </div>
        </div>
    )
}

