"use client"

import type React from "react"
import { Package, Plus, Check, FileText, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import type { Article, FormErrors, RequisitionItem, StepProps } from "../../../types/requisition"

export const StepTwo: React.FC<StepProps> = ({ formData, setFormData, articles }) => {

    const initialItemState: RequisitionItem = {
        article_id: null,
        name: "",
        uniteMesure: "",
        quantiteDemande: 0,
        isNew: true,
    }

    const [currentItem, setCurrentItem] = useState<RequisitionItem>(initialItemState)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [itemErrors, setItemErrors] = useState<FormErrors>({})


    const handleInputChange = (field: keyof RequisitionItem, value: any) => {
        setCurrentItem((prev: any) => {
            const updated = { ...prev }

            if (field === "article_id") {
                // Si on sélectionne un article existant
                const articleId = value ? Number.parseInt(value, 10) : null
                updated.article_id = articleId
                updated.isNew = articleId === null

                // Pré-remplir l'unité de mesure si disponible
                if (articleId) {
                    const selectedArticle = articles?.find((a: Article) => a.id === articleId)
                    if (selectedArticle) {
                        updated.uniteMesure = selectedArticle.uniteMesure || ""
                        updated.name = selectedArticle.name
                    }
                }
            } else if (field === "quantiteDemande") {
                updated.quantiteDemande = value === "" ? 0 : Number.parseInt(value, 10)
            } else {
                updated[field] = value
            }

            return updated
        })

        // Effacer l'erreur si le champ est rempli
        if (value && itemErrors[field]) {
            setItemErrors({ ...itemErrors, [field]: null })
        }
    }

    const validateItem = (): FormErrors => {
        const errors: FormErrors = {}

        if (currentItem.isNew) {
            if (!currentItem.name) errors.name = "Le nom est requis"
        } else {
            if (!currentItem.article_id) errors.article_id = "L'article est requis"
        }

        if (!currentItem.uniteMesure) errors.uniteMesure = "L'unité de mesure est requise"
        if (!currentItem.quantiteDemande) errors.quantiteDemande = "La quantité est requise"

        return errors
    }

    const addItem = () => {
        const errors = validateItem()

        if (Object.keys(errors).length > 0) {
            setItemErrors(errors)
            return
        }

        setFormData((prev: any) => ({
            ...prev,
            items: [...prev.items, { ...currentItem }],
        }))

        // Réinitialiser le formulaire
        setCurrentItem(initialItemState)
        setItemErrors({})
    }

    const updateItem = () => {
        if (editingIndex === null) return

        const errors = validateItem()

        if (Object.keys(errors).length > 0) {
            setItemErrors(errors)
            return
        }

        setFormData((prev) => {
            const updatedItems = [...prev.items]
            updatedItems[editingIndex] = { ...currentItem }
            return { ...prev, items: updatedItems }
        })

        // Réinitialiser le formulaire
        setCurrentItem(initialItemState)
        setEditingIndex(null)
        setItemErrors({})
    }

    const editItem = (index: number) => {
        const item = formData.items[index]
        setCurrentItem({ ...item })
        setEditingIndex(index)
        setItemErrors({})
    }

    const deleteItem = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }))
    }

    const isItemValid = (): boolean => {
        if (currentItem.isNew) {
            return !!(currentItem.name && currentItem.uniteMesure && currentItem.quantiteDemande)
        } else {
            return !!(currentItem.article_id && currentItem.uniteMesure && currentItem.quantiteDemande)
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-2 space-y-2 border border-gray-100">
                <h3 className="font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Package size={18} className="text-blue-600" />
                    Informations sur l'article
                </h3>

                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Nouvel Article</label>
                    <input
                        type="checkbox"
                        checked={currentItem.isNew}
                        onChange={() => setCurrentItem((prev) => ({ ...prev, isNew: !prev.isNew, article_id: null }))}
                    />
                </div>

                {currentItem.isNew ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'article *</label>
                        <input
                            type="text"
                            value={currentItem.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${itemErrors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                        {itemErrors.name && <p className="text-red-500 text-xs mt-1">{itemErrors.name}</p>}
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article existant *</label>
                        <select
                            value={currentItem.article_id || ""}
                            onChange={(e) => handleInputChange("article_id", e.target.value)}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                ${itemErrors.article_id ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Sélectionner un article</option>
                            {articles?.map((article: Article) => (
                                <option key={article.id} value={article.id}>
                                    {article.name}
                                </option>
                            ))}
                        </select>
                        {itemErrors.article_id && <p className="text-red-500 text-xs mt-1">{itemErrors.article_id}</p>}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unité de Mesure *</label>
                        <input
                            type="text"
                            value={currentItem.uniteMesure || ""}
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
                            value={currentItem.quantiteDemande || ""}
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
                        onClick={editingIndex !== null ? updateItem : addItem}
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
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <h3 className="font-medium text-gray-800 p-4 border-b border-gray-100 flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        Articles ajoutés ({formData.items.length})
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unite</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qté D</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formData.items.map((item: any, index: any) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                {item.isNew
                                                    ? item.name
                                                    : (item.name || articles?.find(a => a.id == item.article_id).name || "Article inconnu")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.isNew ? "Nouveau" : "Existant"}</td>
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

