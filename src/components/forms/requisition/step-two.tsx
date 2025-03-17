"use client"

import type React from "react"

import { Package, Plus, Check, FileText, Edit2, Trash2 } from "lucide-react"
import type { FormErrors, RequisitionItem, StepProps } from "../../../types/requisition"
import { useState } from "react"

export const StepTwo: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [currentItem, setCurrentItem] = useState({
        designation: "",
        uniteMesure: "",
        quantiteDemande: "",
        quantiteRequisition: "",
    })
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [itemErrors, setItemErrors] = useState<FormErrors>({})

    const handleInputChange = (field: keyof RequisitionItem, value: string) => {
        const updatedItem = { ...currentItem, [field]: value }
        // Effacer l'erreur si le champ est rempli
        if (value && itemErrors[field]) {
            setItemErrors({ ...itemErrors, [field]: null })
        }

        setCurrentItem(updatedItem)
    }

    const addItem = () => {
        // Validation des champs requis
        const newErrors: FormErrors = {}
        if (!currentItem.designation) newErrors.designation = "Requis"
        if (!currentItem.uniteMesure) newErrors.uniteMesure = "Requis"
        if (!currentItem.quantiteDemande) newErrors.quantiteDemande = "Requis"
        if (Object.keys(newErrors).length > 0) {
            setItemErrors(newErrors)
            return
        }

        // Ajouter l'article à la liste
        const updatedItems = [...formData.items, currentItem] // Ajoute le nouvel article
        setFormData({ ...formData, items: updatedItems }) // Met à jour formData

        // Réinitialiser le formulaire
        setCurrentItem({
            designation: "",
            uniteMesure: "",
            quantiteDemande: "",
            quantiteRequisition: ""
        })
        setEditingIndex(null)
        setItemErrors({})
    }

    const updateItem = () => {
        if (editingIndex === null) return

        // Validation des champs requis
        const newErrors: FormErrors = {}
        if (!currentItem.designation) newErrors.designation = "Requis"
        if (!currentItem.uniteMesure) newErrors.uniteMesure = "Requis"
        if (!currentItem.quantiteDemande) newErrors.quantiteDemande = "Requis"
        if (Object.keys(newErrors).length > 0) {
            setItemErrors(newErrors)
            return
        }

        // Mettre à jour l'article dans la liste
        const updatedItems = [...formData.items]
        updatedItems[editingIndex] = currentItem // Remplace l'article existant
        setFormData({ ...formData, items: updatedItems }) // Met à jour formData

        // Réinitialiser le formulaire
        setCurrentItem({
            designation: "",
            uniteMesure: "",
            quantiteDemande: "",
            quantiteRequisition: ""
        })
        setEditingIndex(null)
        setItemErrors({})
    }

    const editItem = (index: number) => {
        setCurrentItem(formData.items[index])
        setEditingIndex(index)
        setItemErrors({})
    }

    const deleteItem = (index: number) => {
        const updatedItems = formData.items.filter((_, i) => i !== index)
        setFormData({ items: updatedItems })
    }

    const isItemValid = (): boolean => {
        return !!(
            currentItem.designation &&
            currentItem.uniteMesure &&
            currentItem.quantiteDemande
        )
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-2 space-y-2 border border-gray-100">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Package size={18} className="text-blue-600" />
                    Informations sur l'article
                </h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Désignation *</label>
                    <input
                        type="text"
                        value={currentItem.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.designation ? "border-red-500" : "border-gray-300"}`}
                    />
                    {itemErrors.designation && <p className="text-red-500 text-xs mt-1">{itemErrors.designation}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unité de Mesure *</label>
                        <input
                            type="text"
                            value={currentItem.uniteMesure}
                            onChange={(e) => handleInputChange("uniteMesure", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.uniteMesure ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.uniteMesure && <p className="text-red-500 text-xs mt-1">{itemErrors.uniteMesure}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantité Demandée *</label>
                        <input
                            type="number"
                            value={currentItem.quantiteDemande}
                            onChange={(e) => handleInputChange("quantiteDemande", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.quantiteDemande ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.quantiteDemande && <p className="text-red-500 text-xs mt-1">{itemErrors.quantiteDemande}</p>}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={editingIndex !== null ? updateItem : addItem} // Appelle updateItem ou addItem
                        disabled={!isItemValid()}
                        className={`px-4 py-2 rounded-md flex items-center gap-2
        ${isItemValid()
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {editingIndex !== null ? (
                            <>
                                <Check size={18} />
                                Mettre à jour
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                Ajouter
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Items Table */}
            {formData?.items?.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <h3 className="font-medium text-gray-800 p-4 border-b border-gray-100 flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        Articles ajoutés ({formData?.items.length || 0})
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unite</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté D</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formData.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                {item.designation}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.uniteMesure}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantiteDemande}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <button
                                                type="button"
                                                onClick={() => editItem(index)}
                                                className="text-blue-600 hover:text-blue-800 mr-3"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteItem(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
