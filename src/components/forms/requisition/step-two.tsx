"use client"

import type React from "react"
import { Package, Plus, Check, FileText, Edit2, Trash2 } from 'lucide-react'
import type { FormErrors, StepProps } from "../../../types/requisition"
import { useState } from "react"
import { useFetchArticles } from "../../../hooks/apiFeatures/useArticles"

export const StepTwo: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [currentItem, setCurrentItem] = useState({
        name: "",
        article_id: null,
        uniteMesure: "",
        quantiteDemande: 0,
    })
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [itemErrors, setItemErrors] = useState<FormErrors>({})
    const [isNewArticle, setIsNewArticle] = useState(true)

    const { data: articles = [] } = useFetchArticles();

    const handleInputChange = (field: string, value: string) => {
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

        if (isNewArticle) {
            if (!currentItem.name) newErrors.name = "Requis"
        } else {
            if (!currentItem.article_id) newErrors.article_id = "Requis"
        }

        if (!currentItem.uniteMesure) newErrors.uniteMesure = "Requis"
        if (!currentItem.quantiteDemande) newErrors.quantiteDemande = "Requis"

        if (Object.keys(newErrors).length > 0) {
            setItemErrors(newErrors)
            return
        }

        // Prepare the item based on whether it's new or existing
        let newItemsArray = [...(formData.newItems || [])]
        let itemsArray = [...(formData.items || [])]

        if (isNewArticle) {
            // Add to newItems array
            newItemsArray.push({
                name: currentItem.name,
                uniteMesure: currentItem.uniteMesure,
                // Store UI-only data in a separate field
                _uiData: {
                    quantiteDemande: currentItem.quantiteDemande
                }
            })
        } else {
            // Add to items array
            itemsArray.push({
                article_id: currentItem.article_id,
                // Store UI-only data in a separate field
                uniteMesure: currentItem.uniteMesure,
                _uiData: {
                    quantiteDemande: currentItem.quantiteDemande,
                    designation: articles.find(a => a.id === currentItem.article_id)?.name || ""
                }
            })
        }

        // Update formData with both arrays
        setFormData({
            ...formData,
            newItems: newItemsArray,
            items: itemsArray
        })

        // Réinitialiser le formulaire
        setCurrentItem({
            name: "",
            article_id: null,
            uniteMesure: "",
            quantiteDemande: 0
        })
        setEditingIndex(null)
        setItemErrors({})
    }

    const updateItem = () => {
        if (editingIndex === null) return

        // Validation des champs requis
        const newErrors: FormErrors = {}

        if (isNewArticle) {
            if (!currentItem.name) newErrors.name = "Requis"
        } else {
            if (!currentItem.article_id) newErrors.article_id = "Requis"
        }

        if (!currentItem.uniteMesure) newErrors.uniteMesure = "Requis"
        if (!currentItem.quantiteDemande) newErrors.quantiteDemande = "Requis"

        if (Object.keys(newErrors).length > 0) {
            setItemErrors(newErrors)
            return
        }

        // Update the appropriate array based on whether it's a new or existing item
        if (isNewArticle) {
            const newItemsArray = [...(formData.newItems || [])]
            if (editingIndex < newItemsArray.length) {
                newItemsArray[editingIndex] = {
                    name: currentItem.name,
                    uniteMesure: currentItem.uniteMesure,
                    _uiData: {

                        quantiteDemande: currentItem.quantiteDemande
                    }
                }
                setFormData({ ...formData, newItems: newItemsArray })
            }
        } else {
            const itemsArray = [...(formData.items || [])]
            if (editingIndex < itemsArray.length) {
                itemsArray[editingIndex] = {
                    article_id: currentItem.article_id,
                    uniteMesure: currentItem.uniteMesure,
                    _uiData: {

                        quantiteDemande: currentItem.quantiteDemande,
                        designation: articles.find(a => a.id === currentItem.article_id)?.name || ""
                    }
                }
                setFormData({ ...formData, items: itemsArray })
            }
        }

        // Réinitialiser le formulaire
        setCurrentItem({
            name: "",
            article_id: null,
            uniteMesure: "",
            quantiteDemande: 0
        })
        setEditingIndex(null)
        setItemErrors({})
    }

    const editItem = (index: number, isNew: boolean) => {
        if (isNew) {
            const item = formData.newItems?.[index]
            if (item) {
                setCurrentItem({
                    name: item.name,
                    article_id: null,
                    uniteMesure: item.uniteMesure || "",
                    quantiteDemande: item._uiData?.quantiteDemande || ""
                })
                setIsNewArticle(true)
            }
        } else {
            const item = formData.items?.[index]
            if (item) {
                setCurrentItem({
                    name: "",
                    article_id: item.article_id,
                    uniteMesure: item.uniteMesure || "",
                    quantiteDemande: item._uiData?.quantiteDemande || ""
                })
                setIsNewArticle(false)
            }
        }
        setEditingIndex(index)
        setItemErrors({})
    }

    const deleteItem = (index: number, isNew: boolean) => {
        if (isNew) {
            const newItemsArray = [...(formData.newItems || [])].filter((_, i) => i !== index)
            setFormData({ ...formData, newItems: newItemsArray })
        } else {
            const itemsArray = [...(formData.items || [])].filter((_, i) => i !== index)
            setFormData({ ...formData, items: itemsArray })
        }
    }

    const isItemValid = (): boolean => {
        if (isNewArticle) {
            return !!(currentItem.name && currentItem.uniteMesure && currentItem.quantiteDemande)
        } else {
            return !!(currentItem.article_id && currentItem.uniteMesure && currentItem.quantiteDemande)
        }
    }

    // Combine both arrays for display purposes
    const getAllItems = () => {
        const newItemsWithMeta = (formData.newItems || []).map((item: any, index: any) => ({
            ...item,
            _isNew: true,
            _index: index,
            designation: item.name,
            uniteMesure: item.uniteMesure || "",
            quantiteDemande: item._uiData?.quantiteDemande || ""
        }))

        const existingItemsWithMeta = (formData.items || []).map((item, index) => ({
            ...item,
            _isNew: false,
            _index: index,
            designation: item._uiData?.designation || articles.find(a => a.id === item.article_id)?.name || "Article inconnu",
            uniteMesure: item.uniteMesure || "",
            quantiteDemande: item._uiData?.quantiteDemande || ""
        }))

        return [...newItemsWithMeta, ...existingItemsWithMeta]
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
                        checked={isNewArticle}
                        onChange={() => setIsNewArticle(!isNewArticle)}
                    />
                </div>

                {isNewArticle ? (
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
                            {articles.map((article: any) => (
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
            {(formData.newItems?.length > 0 || formData.items?.length > 0) && (
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <h3 className="font-medium text-gray-800 p-4 border-b border-gray-100 flex items-center gap-2">
                        <FileText size={18} className="text-blue-600" />
                        Articles ajoutés ({getAllItems().length})
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
                                {getAllItems().map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                {item.designation}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {item._isNew ? "Nouveau" : "Existant"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.uniteMesure}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantiteDemande}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <button
                                                type="button"
                                                onClick={() => editItem(item._index, item._isNew)}
                                                className="text-blue-600 hover:text-blue-800 mr-3"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteItem(item._index, item._isNew)}
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