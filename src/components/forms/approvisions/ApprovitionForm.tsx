"use client"

import type React from "react"
import { useState, useRef } from "react"
import { StepIndicator } from "../step-indicator"
import { Plus, Trash2, FileText, X, Check, AlertTriangle, CheckCircle } from "lucide-react"
import SelectSearch, { type SelectOption } from "../../ui/selectSearch"

// Types
interface Article {
    id: number
    name: string
    description?: string
}

interface RequisitionItem {
    id: number
    article: Article
    article_id: number
    quantiteDemande: number
    unitPrice?: number
    prix_total?: number
    supplier_id?: string | null
    transaction_type?: string
    avance_credit?: number
}

// Types de transaction disponibles
const transactionTypes = [
    {
        id: "type-001",
        name: "En Stock",
        type: "stock",
        icon: "Package",
        description: "Articles disponibles en stock",
    },
    {
        id: "type-002",
        name: "Crédit",
        type: "credit",
        icon: "CreditCard",
        description: "Paiement différé",
    },
    {
        id: "type-003",
        name: "Paiement Cash",
        type: "cash",
        icon: "DollarSign",
        description: "Paiement immédiat",
    },
]

// Priorités disponibles
const priorities = [
    {
        value: "low",
        label: "Basse",
        color: "blue",
        description: "Délai flexible",
    },
    {
        value: "normal",
        label: "Normale",
        color: "yellow",
        description: "Délai standard",
    },
    {
        value: "high",
        label: "Haute",
        color: "red",
        description: "Urgent",
    },
]

function ApprovitionForm({ onClose, requisition }: any) {
    // Étapes du formulaire
    const steps = [
        { id: 1, label: "Sélection des articles" },
        { id: 2, label: "Prix et détails" },
        { id: 3, label: "Confirmation" },
    ]

    // État initial des fournisseurs
    const [suppliers, setSuppliers] = useState<SelectOption[]>([
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
        { value: "4", label: "Supplier 4" },
    ])

    // États du formulaire
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedItems, setSelectedItems] = useState<RequisitionItem[]>([])
    const [priority, setPriority] = useState("normal")
    const [comment, setComment] = useState("")
    const [attachments, setAttachments] = useState<File[]>([])
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isAddingSupplier, setIsAddingSupplier] = useState(false)
    const user = { id: null, name: null }
    // Référence pour l'input de fichier
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Calculer le total général
    const grandTotal = selectedItems.reduce((sum, item) => {
        const totalPrice = item.unitPrice && item.quantiteDemande ? item.unitPrice * item.quantiteDemande : 0
        return sum + totalPrice
    }, 0)

    // Ajouter un article à la liste
    const handleAddItem = (item: RequisitionItem) => {
        // Vérifier si l'article est déjà dans la liste
        if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
            showModalAlert("Information", "Cet article est déjà ajouté à la liste.", "info")
            return
        }

        const newItem = {
            ...item,
            unitPrice: 0,
            prix_total: 0,
            supplier_id: null,
            transaction_type: "stock",
            avance_credit: 0,
        }

        setSelectedItems([...selectedItems, newItem])
    }

    // Supprimer un article de la liste
    const handleRemoveItem = (itemId: number) => {
        setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
    }

    // Mettre à jour le prix unitaire d'un article
    const handleUnitPriceChange = (itemId: number, price: number) => {
        setSelectedItems(
            selectedItems.map((item) => {
                if (item.id === itemId) {
                    const unitPrice = price
                    const prix_total = unitPrice * item.quantiteDemande
                    return { ...item, unitPrice, prix_total }
                }
                return item
            }),
        )
    }

    // Mettre à jour le fournisseur d'un article
    const handleSupplierChange = (itemId: number, supplier: SelectOption | null) => {
        setSelectedItems(
            selectedItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, supplier_id: supplier ? supplier.value : null }
                }
                return item
            }),
        )
    }

    // Ajouter un nouveau fournisseur
    const handleAddSupplier = async (name: string) => {
        setIsAddingSupplier(true)

        try {
            // Simuler un appel API pour ajouter un fournisseur
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Générer un ID unique pour le nouveau fournisseur
            const newId = `new-${Date.now()}`

            // Créer le nouveau fournisseur
            const newSupplier: SelectOption = {
                value: newId,
                label: name,
            }

            // Ajouter le fournisseur à la liste
            setSuppliers((prev) => [...prev, newSupplier])

            // Afficher un message de succès
            showModalAlert("Succès", `Le fournisseur "${name}" a été ajouté avec succès.`, "success")

            return newSupplier
        } catch (error) {
            showModalAlert("Erreur", "Une erreur est survenue lors de l'ajout du fournisseur.", "error")
            return null
        } finally {
            setIsAddingSupplier(false)
        }
    }

    // Mettre à jour le type de transaction d'un article
    const handleTransactionTypeChange = (itemId: number, type: string) => {
        setSelectedItems(
            selectedItems.map((item) => {
                if (item.id === itemId) {
                    // Si on change de crédit à autre chose, réinitialiser l'avance
                    const avance_credit = type === "credit" ? item.avance_credit : 0
                    return { ...item, transaction_type: type, avance_credit }
                }
                return item
            }),
        )
    }

    // Mettre à jour l'avance crédit d'un article
    const handleAdvancePaymentChange = (itemId: number, percentage: number) => {
        setSelectedItems(
            selectedItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, avance_credit: percentage }
                }
                return item
            }),
        )
    }

    // Gérer le changement d'étape
    const goToNextStep = () => {
        if (currentStep === 1 && selectedItems.length === 0) {
            showModalAlert("Attention", "Veuillez sélectionner au moins un article avant de continuer.", "warning")
            return
        }

        if (currentStep === 1) {
            // Vérifier que tous les articles ont un fournisseur et un type de transaction
            const missingInfo = selectedItems.some((item) => !item.supplier_id || !item.transaction_type)
            if (missingInfo) {
                showModalAlert(
                    "Attention",
                    "Veuillez définir un fournisseur et un type de transaction pour tous les articles.",
                    "warning",
                )
                return
            }
        }

        if (currentStep === 2) {
            // Vérifier que tous les articles ont un prix unitaire
            const missingPrices = selectedItems.some((item) => !item.unitPrice || item.unitPrice <= 0)
            if (missingPrices) {
                showModalAlert("Attention", "Veuillez définir un prix unitaire pour tous les articles.", "warning")
                return
            }
        }

        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    // Gérer l'ajout de pièces jointes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setAttachments([...attachments, ...newFiles])
        }
    }

    // Supprimer une pièce jointe
    const handleRemoveAttachment = (index: number) => {
        const newAttachments = [...attachments]
        newAttachments.splice(index, 1)
        setAttachments(newAttachments)
    }

    // Afficher une alerte modale
    const showModalAlert = (title: string, message: string, type: string) => {
        setModalContent({ title, message, type })
        setShowModal(true)
    }

    // Préparer les données pour l'API
    const prepareDataForApi = () => {
        // Transformer les items pour correspondre à la structure attendue par l'API
        const formattedItems = selectedItems.map((item) => ({
            article_id: item.article_id,
            prix_unitaire: item.unitPrice || 0,
            prix_total: item.prix_total || 0,
            transaction_type: item.transaction_type || "stock",
            avance_credit: item.transaction_type === "credit" ? item.avance_credit || 0 : 0,
            supplier_id: item.supplier_id || null,
        }))

        return {
            requisition_id: requisition.id,
            priority,
            comment,
            user_id: user?.id || null,
            items: formattedItems,
        }
    }

    // Soumettre le formulaire
    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            // Préparer les données pour l'API
            const apiData = prepareDataForApi()

            // Simuler un appel API
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log("Données envoyées à l'API:", apiData)

            showModalAlert(
                "Succès",
                "Votre demande d'approvisionnement a été envoyée au service de comptabilité avec succès.",
                "success",
            )

            // Réinitialiser le formulaire après soumission
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (error) {
            console.error("Erreur lors de la soumission:", error)
            showModalAlert("Erreur", "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.", "error")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Annuler la réquisition
    const handleCancel = () => {
        showModalAlert("Confirmation", "Êtes-vous sûr de vouloir annuler cette demande d'approvisionnement?", "confirm")
    }

    // Confirmer l'annulation
    const confirmCancel = () => {
        setShowModal(false)
        onClose()
    }

    // Rendu des étapes du formulaire
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="p-6 bg-white rounded-b-lg shadow-md">
                        {requisition && (
                            <div className="border border-blue-200 rounded-lg p-4 mb-6">
                                <h3 className="text-lg font-medium text-blue-800 mb-4">Articles disponibles</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-blue-200">
                                        <thead className="bg-blue-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Article
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Quantité
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-blue-100">
                                            {requisition?.items.map((item: any) => (
                                                <tr key={item.id} className="hover:bg-blue-50">
                                                    <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{item.article.description || "-"}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {Number.parseInt(item.quantiteDemande.toString())}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <button
                                                            onClick={() => handleAddItem(item)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
                                                        >
                                                            <Plus size={16} className="mr-1" />
                                                            Ajouter
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selectedItems.length > 0 && (
                            <div className="border border-blue-200 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-blue-800 mb-4">Articles sélectionnés</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-blue-200">
                                        <thead className="bg-blue-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Article
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Quantité
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Fournisseur
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Type de Transaction
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-blue-100">
                                            {selectedItems.map((item) => (
                                                <tr key={item.id} className="hover:bg-blue-50">
                                                    <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {Number.parseInt(item.quantiteDemande.toString())}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        <SelectSearch
                                                            options={suppliers}
                                                            value={
                                                                item.supplier_id ? suppliers.find((s) => s.value === item.supplier_id) || null : null
                                                            }
                                                            onChange={(supplier) => handleSupplierChange(item.id, supplier)}
                                                            onAddNewItem={async (name) => {
                                                                const newSupplier = await handleAddSupplier(name)
                                                                if (newSupplier) {
                                                                    handleSupplierChange(item.id, newSupplier)
                                                                }
                                                            }}
                                                            placeholder="Sélectionner un fournisseur"
                                                            isSearchable={true}
                                                            disabled={isAddingSupplier}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        <div>
                                                            {transactionTypes.map((type) => (
                                                                <label key={type.id} className="inline-flex items-center mr-4">
                                                                    <input
                                                                        type="radio"
                                                                        name={`transactionType-${item.id}`}
                                                                        value={type.type}
                                                                        checked={item.transaction_type === type.type}
                                                                        onChange={(e) => handleTransactionTypeChange(item.id, e.target.value)}
                                                                        className="text-blue-600"
                                                                    />
                                                                    <span className="ml-2 text-sm">{type.name}</span>
                                                                </label>
                                                            ))}
                                                        </div>

                                                        {item.transaction_type === "credit" && (
                                                            <div className="mt-2 pl-6">
                                                                <label className="block text-xs text-gray-600 mb-1">Avance (%)</label>
                                                                <input
                                                                    type="range"
                                                                    min="0"
                                                                    max="50"
                                                                    step="5"
                                                                    value={item.avance_credit || 0}
                                                                    onChange={(e) => handleAdvancePaymentChange(item.id, Number.parseInt(e.target.value))}
                                                                    className="w-full accent-blue-500"
                                                                />
                                                                <div className="flex justify-between text-xs text-gray-500">
                                                                    <span>0%</span>
                                                                    <span>{item.avance_credit || 0}%</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
                                                        >
                                                            <Trash2 size={16} className="mr-1" />
                                                            Retirer
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

            case 2:
                return (
                    <div className="p-6 bg-white rounded-b-lg shadow-md">
                        <h3 className="text-lg font-medium text-blue-800 mb-4">Définir les prix unitaires</h3>

                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full divide-y divide-blue-200">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Article
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Fournisseur
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Quantité
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Prix unitaire (€)
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Prix total (€)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-blue-100">
                                    {selectedItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {suppliers.find((s) => s.value === item.supplier_id)?.label || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {Number.parseInt(item.quantiteDemande.toString())}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item?.unitPrice || 0}
                                                    onChange={(e) => handleUnitPriceChange(item.id, Number.parseFloat(e.target.value) || 0)}
                                                    className="w-24 p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-blue-700">
                                                {item.unitPrice ? (item.unitPrice * item.quantiteDemande).toFixed(2) : "0.00"}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50">
                                        <td colSpan={4} className="px-4 py-3 text-right text-sm font-medium text-blue-800">
                                            Total
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-blue-800">{grandTotal.toFixed(2)} €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {priorities.map((p) => (
                                    <label
                                        key={p.value}
                                        className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            checked={priority === p.value}
                                            onChange={() => setPriority(p.value)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <div className="ml-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 bg-${p.color}-500 rounded-full`}></span>
                                                <span className="text-sm font-medium">{p.label}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-800 mb-4">Pièces jointes</h3>
                            <div className="mb-4">
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <FileText size={18} className="mr-2" /> Ajouter des fichiers
                                </button>
                            </div>

                            {attachments.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    <p className="text-sm font-medium text-blue-700">Fichiers ajoutés:</p>
                                    <ul className="space-y-2">
                                        {attachments.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                                                <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAttachment(index)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-800 mb-2">Commentaire</h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder="Ajoutez un commentaire ou des instructions supplémentaires..."
                            ></textarea>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="p-6 bg-white rounded-b-lg shadow-md">
                        <div className="bg-green-50 mb-4 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="text-sm text-green-700 font-medium">Prêt à soumettre</p>
                                <p className="text-sm text-green-700 mt-1">
                                    Veuillez vérifier les informations ci-dessous avant de soumettre votre demande.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                            <h3 className="text-lg font-medium text-blue-800 mb-2">Récapitulatif de la demande</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                Veuillez vérifier les informations ci-dessous avant de soumettre votre demande.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Nombre d'articles:</p>
                                    <p className="text-sm text-gray-700">{selectedItems.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Montant total:</p>
                                    <p className="text-sm text-gray-700">{grandTotal.toFixed(2)} €</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Priorité:</p>
                                    <p className="text-sm text-gray-700">
                                        {priorities.find((p) => p.value === priority)?.label || "Non spécifiée"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Pièces jointes:</p>
                                    <p className="text-sm text-gray-700">{attachments.length} fichier(s)</p>
                                </div>
                            </div>

                            {comment && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-blue-700">Commentaire:</p>
                                    <p className="text-sm text-gray-700 bg-white p-2 rounded border border-blue-100">{comment}</p>
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto mb-6">
                            <h4 className="text-md font-medium text-blue-800 mb-2">Articles</h4>
                            <table className="min-w-full divide-y divide-blue-200">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Article
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Fournisseur
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Quantité
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Prix unitaire
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                            Prix total
                                        </th>
                                        {selectedItems.some((item) => item.transaction_type === "credit") && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                                Avance
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-blue-100">
                                    {selectedItems.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {suppliers.find((s) => s.value === item.supplier_id)?.label || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {transactionTypes.find((t) => t.type === item.transaction_type)?.name || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.quantiteDemande}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.unitPrice?.toFixed(2)} €</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {item.unitPrice && item.quantiteDemande
                                                    ? (item.unitPrice * item.quantiteDemande).toFixed(2)
                                                    : "0.00"}{" "}
                                                €
                                            </td>
                                            {selectedItems.some((item) => item.transaction_type === "credit") && (
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {item.transaction_type === "credit" ? `${item.avance_credit || 0}%` : "-"}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50">
                                        <td
                                            colSpan={selectedItems.some((item) => item.transaction_type === "credit") ? 6 : 5}
                                            className="px-4 py-3 text-right text-sm font-medium text-blue-800"
                                        >
                                            Total
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-blue-800">{grandTotal.toFixed(2)} €</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        En soumettant cette demande, vous confirmez que toutes les informations fournies sont correctes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    // Rendu du modal
    const renderModal = () => {
        if (!showModal) return null

        let icon
        let buttonColor = "bg-blue-600 hover:bg-blue-700"

        switch (modalContent.type) {
            case "success":
                icon = <Check className="h-6 w-6 text-green-500" />
                buttonColor = "bg-green-600 hover:bg-green-700"
                break
            case "error":
                icon = <X className="h-6 w-6 text-red-500" />
                buttonColor = "bg-red-600 hover:bg-red-700"
                break
            case "warning":
                icon = <AlertTriangle className="h-6 w-6 text-yellow-500" />
                buttonColor = "bg-yellow-600 hover:bg-yellow-700"
                break
            case "confirm":
                icon = <AlertTriangle className="h-6 w-6 text-yellow-500" />
                buttonColor = "bg-yellow-600 hover:bg-yellow-700"
                break
            default:
                icon = <Check className="h-6 w-6 text-blue-500" />
        }

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    {icon}
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{modalContent.title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{modalContent.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {modalContent.type === "confirm" ? (
                                <>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={confirmCancel}
                                    >
                                        Confirmer
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${buttonColor} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                    onClick={() => setShowModal(false)}
                                >
                                    Fermer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden max-w-[1000px] `}>
            <div className="">
                <StepIndicator currentStep={currentStep} steps={steps} />

                {renderStepContent()}
            </div>
            <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-between">
                <button
                    type="button"
                    onClick={currentStep === 1 ? handleCancel : goToPreviousStep}
                    className="px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {currentStep === 1 ? "Annuler" : "Précédent"}
                </button>

                <button
                    type="button"
                    onClick={currentStep === steps.length ? handleSubmit : goToNextStep}
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {currentStep === steps.length ? (isSubmitting ? "Envoi en cours..." : "Soumettre") : "Suivant"}
                </button>
            </div>

            {renderModal()}
        </div>
    )
}

export default ApprovitionForm

