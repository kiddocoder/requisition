"use client"

import type React from "react"

import { useState } from "react"
import { Package, FileText, DollarSign, CreditCard, AlertCircle, Check, Plus, Edit2, Trash2 } from "lucide-react"
import type { StepProps, RequisitionItem, FormErrors } from "../../../types/requisition"

export const StepOne: React.FC<StepProps> = ({ formData, updateFormData, calculateGrandTotal }) => {
    const [currentItem, setCurrentItem] = useState<RequisitionItem>({
        designation: "",
        uniteMesure: "",
        quantiteDemande: "",
        quantiteRequisition: "",
        prixUnitaire: "",
        prixTotal: "",
        type: "stock",
        advancePayment: "0",
    })
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [itemErrors, setItemErrors] = useState<FormErrors>({})

    const calculateTotal = (item: RequisitionItem): string => {
        const qte = Number.parseFloat(item.quantiteRequisition) || 0
        const pu = Number.parseFloat(item.prixUnitaire) || 0
        return (qte * pu).toString()
    }

    const handleInputChange = (field: keyof RequisitionItem, value: string) => {
        const updatedItem = { ...currentItem, [field]: value }

        if (field === "quantiteRequisition" || field === "prixUnitaire") {
            updatedItem.prixTotal = calculateTotal(updatedItem)
        }

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
        if (!currentItem.quantiteRequisition) newErrors.quantiteRequisition = "Requis"
        if (!currentItem.prixUnitaire) newErrors.prixUnitaire = "Requis"

        if (Object.keys(newErrors).length > 0) {
            setItemErrors(newErrors)
            return
        }

        const updatedItems = [...formData.items]

        if (editingIndex !== null) {
            updatedItems[editingIndex] = { ...currentItem, prixTotal: calculateTotal(currentItem) }
        } else {
            updatedItems.push({ ...currentItem, prixTotal: calculateTotal(currentItem) })
        }

        updateFormData({ items: updatedItems })

        // Réinitialiser le formulaire
        setCurrentItem({
            designation: "",
            uniteMesure: "",
            quantiteDemande: "",
            quantiteRequisition: "",
            prixUnitaire: "",
            prixTotal: "",
            type: "stock",
            advancePayment: "0",
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
        updateFormData({ items: updatedItems })
    }

    const isItemValid = (): boolean => {
        return !!(
            currentItem.designation &&
            currentItem.uniteMesure &&
            currentItem.quantiteDemande &&
            currentItem.quantiteRequisition &&
            currentItem.prixUnitaire
        )
    }


    const renderItemTypeIcon = (type: string) => {
        switch (type) {
            case "stock":
                return <Package size={16} className="text-blue-500" />
            case "credit":
                return <CreditCard size={16} className="text-orange-500" />
            case "cash":
                return <DollarSign size={16} className="text-green-500" />
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
            <div className="bg-white rounded-lg p-2 space-y-2 border border-gray-100">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Package size={18} className="text-blue-600" />
                    Informations sur l'article
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unité de Mesure *</label>
                        <select
                            value={currentItem.uniteMesure}
                            onChange={(e) => handleInputChange("uniteMesure", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.uniteMesure ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Sélectionner</option>
                            <option value="unité">Unité</option>
                            <option value="kg">Kilogramme</option>
                            <option value="l">Litre</option>
                            <option value="m">Mètre</option>
                            <option value="pièce">Pièce</option>
                            <option value="paquet">Paquet</option>
                            <option value="carton">Carton</option>
                        </select>
                        {itemErrors.uniteMesure && <p className="text-red-500 text-xs mt-1">{itemErrors.uniteMesure}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantité de Réquisition *</label>
                        <input
                            type="number"
                            value={currentItem.quantiteRequisition}
                            onChange={(e) => handleInputChange("quantiteRequisition", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${itemErrors.quantiteRequisition ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.quantiteRequisition && (
                            <p className="text-red-500 text-xs mt-1">{itemErrors.quantiteRequisition}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix Unitaire (PU) *</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                            <input
                                type="number"
                                value={currentItem.prixUnitaire}
                                onChange={(e) => handleInputChange("prixUnitaire", e.target.value)}
                                className={`w-full pl-8 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  ${itemErrors.prixUnitaire ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                        {itemErrors.prixUnitaire && <p className="text-red-500 text-xs mt-1">{itemErrors.prixUnitaire}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix Total (PT)</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                            <input
                                type="number"
                                value={calculateTotal(currentItem)}
                                readOnly
                                className="w-full pl-8 p-2 border rounded-md bg-gray-50 border-gray-300"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de Transaction</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={currentItem.type === "stock"}
                                onChange={() => handleInputChange("type", "stock")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <Package size={16} className="text-blue-600" />
                                    <span className="text-sm font-medium">En Stock</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Articles disponibles en stock</p>
                            </div>
                        </label>

                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={currentItem.type === "credit"}
                                onChange={() => handleInputChange("type", "credit")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <CreditCard size={16} className="text-orange-600" />
                                    <span className="text-sm font-medium">Crédit</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Paiement différé</p>
                            </div>
                        </label>

                        <label className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                            <input
                                type="radio"
                                checked={currentItem.type === "cash"}
                                onChange={() => handleInputChange("type", "cash")}
                                className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-2">
                                <div className="flex items-center gap-1.5">
                                    <DollarSign size={16} className="text-green-600" />
                                    <span className="text-sm font-medium">Paiement Cash</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Paiement immédiat</p>
                            </div>
                        </label>
                    </div>
                </div>

                {currentItem.type === "credit" && (
                    <div className="p-4 border rounded-md bg-orange-50 border-orange-200">
                        <h4 className="text-sm font-medium text-orange-800 mb-2 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Option de paiement anticipé
                        </h4>
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-700 mb-1">Montant d'avance (%)</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="5"
                                value={currentItem.advancePayment}
                                onChange={(e) => handleInputChange("advancePayment", e.target.value)}
                                className="w-full accent-orange-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span>Paiement d'avance: {currentItem.advancePayment}%</span>
                                <span>50%</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={addItem}
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
            {formData.items.length > 0 && (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <h3 className="font-medium text-gray-800 p-4 border-b flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        Articles ajoutés ({formData.items.length})
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PT</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formData.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                {item.designation}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {item.quantiteRequisition} {item.uniteMesure}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${item.prixUnitaire}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${item.prixTotal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-1">
                                                {renderItemTypeIcon(item.type)}
                                                <span>{getTypeLabel(item.type)}</span>
                                            </div>
                                        </td>
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
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-sm font-medium text-right">
                                        Total:
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">${calculateGrandTotal().toFixed(2)}</td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

