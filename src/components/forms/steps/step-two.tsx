"use client"

import type React from "react"

import { FileText, ChevronDown, AlertCircle } from "lucide-react"
import type { StepProps } from "../../../types/requisition"

export const StepTwo: React.FC<StepProps> = ({ formData, updateFormData, errors, setErrors, calculateGrandTotal }) => {
    // Liste des fournisseurs (exemple)
    const suppliers = [
        "Fournitures Express",
        "TechPro Solutions",
        "Bureau Moderne",
        "Équipements Industriels Inc.",
        "Matériaux Premium",
    ]

    // Liste des départements (exemple)
    const departments = [
        "Administration",
        "Comptabilité",
        "Informatique",
        "Marketing",
        "Production",
        "Ressources Humaines",
        "Ventes",
    ]

    const handleInputChange = (field: string, value: string) => {
        updateFormData({ [field]: value })

        if (value && errors[field]) {
            setErrors({ ...errors, [field]: null })
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-2 space-y-2 border border-gray-100">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <FileText size={18} className="text-blue-600" />
                    Informations générales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la réquisition *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Ex: Fournitures de bureau"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${errors.title ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de réquisition</label>
                        <input
                            type="date"
                            value={formData.requisitionDate}
                            onChange={(e) => handleInputChange("requisitionDate", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur *</label>
                        <div className="relative">
                            <select
                                value={formData.supplier}
                                onChange={(e) => handleInputChange("supplier", e.target.value)}
                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none
                  ${errors.supplier ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option value="">Sélectionner un fournisseur</option>
                                {suppliers.map((s, i) => (
                                    <option key={i} value={s}>
                                        {s}
                                    </option>
                                ))}
                                <option value="autre">Autre (spécifier)</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>}
                        {formData.supplier === "autre" && (
                            <input
                                type="text"
                                placeholder="Nom du fournisseur"
                                className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => handleInputChange("supplier", e.target.value)}
                            />
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Département *</label>
                        <div className="relative">
                            <select
                                value={formData.department}
                                onChange={(e) => handleInputChange("department", e.target.value)}
                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none
                  ${errors.department ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option value="">Sélectionner un département</option>
                                {departments.map((d, i) => (
                                    <option key={i} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={formData.priority === "low"}
                                onChange={() => handleInputChange("priority", "low")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-sm font-medium">Basse</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Délai flexible</p>
                            </div>
                        </label>

                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={formData.priority === "normal"}
                                onChange={() => handleInputChange("priority", "normal")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span className="text-sm font-medium">Normale</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Délai standard</p>
                            </div>
                        </label>

                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={formData.priority === "high"}
                                onChange={() => handleInputChange("priority", "high")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="text-sm font-medium">Haute</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Urgent</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
                    <textarea
                        value={formData.comments}
                        onChange={(e) => handleInputChange("comments", e.target.value)}
                        rows={4}
                        placeholder="Informations supplémentaires ou instructions spéciales..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="text-sm text-blue-700 font-medium">Récapitulatif</p>
                    <p className="text-sm text-blue-700 mt-1">
                        Vous avez ajouté {formData.items.length} article{formData.items.length > 1 ? "s" : ""} pour un total de $
                        {calculateGrandTotal().toFixed(2)}.
                    </p>
                </div>
            </div>
        </div>
    )
}

