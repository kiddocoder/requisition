
import React, { useState, useRef } from "react"
import { StepIndicator } from "../step-indicator"
import { Plus, Trash2, FileText, X, Check, AlertTriangle, Package, CreditCard, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'

import type { RequisitionItem } from "../../../types/requisition"
import { useNavigate } from "react-router-dom"

// Types de transaction disponibles
const transactionTypes = [
    {
        id: "type-001",
        name: "En Stock",
        type: "stock",
        icon: "Package",
        description: "Articles disponibles en stock"
    },
    {
        id: "type-002",
        name: "Crédit",
        type: "credit",
        icon: "CreditCard",
        description: "Paiement différé"
    },
    {
        id: "type-003",
        name: "Paiement Cash",
        type: "cash",
        icon: "DollarSign",
        description: "Paiement immédiat"
    }
]

// Priorités disponibles
const priorities = [
    {
        value: "low",
        label: "Basse",
        color: "blue",
        description: "Délai flexible"
    },
    {
        value: "normal",
        label: "Normale",
        color: "yellow",
        description: "Délai standard"
    },
    {
        value: "high",
        label: "Haute",
        color: "red",
        description: "Urgent"
    }
]

function ApprovitionForm({ onClose, requisition }) {
    // Étapes du formulaire
    const steps = [
        { id: 1, label: "Sélection des articles" },
        { id: 2, label: "Prix et détails" },
        { id: 3, label: "Confirmation" }
    ]
    const suppliers = [
        { id: "1", name: "Supplier 1" },
        { id: "2", name: "Supplier 2" },
        { id: "3", name: "Supplier 3" },
        { id: "4", name: "Supplier 4" },
    ]

    // États du formulaire
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedRequisition, setSelectedRequisition] = useState(requisition)
    const [selectedItems, setSelectedItems] = useState<RequisitionItem[]>([])
    const [transactionType, setTransactionType] = useState("stock")
    const [advancePayment, setAdvancePayment] = useState(0)
    const [priority, setPriority] = useState("normal")
    const [comment, setComment] = useState("")
    const [attachments, setAttachments] = useState<File[]>([])
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    // Référence pour l'input de fichier
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Calculer le total général
    const grandTotal = selectedItems.reduce((sum, item) => {
        const totalPrice = item.unitPrice && item.quantity ? item.unitPrice * item.quantity : 0
        return sum + totalPrice
    }, 0)

    // Ajouter un article à la liste
    const handleAddItem = (item: any) => {
        // Vérifier si l'article est déjà dans la liste
        if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
            showModalAlert("Information", "Cet article est déjà ajouté à la liste.", "info")
            return
        }

        const newItem = {
            ...item,
            unitPrice: 0, // Prix unitaire à définir par l'utilisateur
            totalPrice: 0 // Sera calculé après l'ajout du prix unitaire
        }

        setSelectedItems([...selectedItems, newItem])
    }

    // Supprimer un article de la liste
    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId))
    }

    // Mettre à jour le prix unitaire d'un article
    const handleUnitPriceChange = (itemId: number, price: number) => {
        setSelectedItems(selectedItems.map(item => {
            if (item.id === itemId) {
                const unitPrice = price
                const totalPrice = unitPrice * item.quantiteDemande
                return { ...item, unitPrice, totalPrice }
            }
            return item
        }))
    }

    // Gérer le changement d'étape
    const goToNextStep = () => {
        if (currentStep === 1 && selectedItems.length === 0) {
            showModalAlert("Attention", "Veuillez sélectionner au moins un article avant de continuer.", "warning")
            return
        }

        if (currentStep === 2) {
            // Vérifier que tous les articles ont un prix unitaire
            const missingPrices = selectedItems.some(item => !item.unitPrice || item.unitPrice <= 0)
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

    // Soumettre le formulaire
    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            // Simuler un appel API
            await new Promise(resolve => setTimeout(resolve, 3000))

            console.log("Approvisionnement soumis avec succès:", {
                items: selectedItems,
                transactionType,
                advancePayment: transactionType === "credit" ? advancePayment : 0,
                priority,
                attachments: attachments.map(file => file.name),
                comment,
                total: grandTotal
            })

            showModalAlert("Succès", "Votre demande d'approvisionnement a été envoyée au service de comptabilité avec succès.", "success")

            // Réinitialiser le formulaire après soumission
            setTimeout(() => {
                setCurrentStep(1)
                setSelectedRequisition("")
                setSelectedItems([])
                setTransactionType("stock")
                setAdvancePayment(0)
                setPriority("normal")
                setComment("")
                setAttachments([])
            }, 100)
            navigate("/comptabilite");
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
        console.log("Demande d'approvisionnement annulée")

        // Réinitialiser le formulaire
        setCurrentStep(1)
        setSelectedRequisition("")
        setSelectedItems([])
        setTransactionType("stock")
        setAdvancePayment(0)
        setPriority("normal")
        setComment("")
        setAttachments([])
        setTimeout(() => onClose(), 10)
    }

    // Rendu des étapes du formulaire
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="p-6 bg-white rounded-b-lg shadow-md">
                        {selectedRequisition && (
                            <div className="border border-blue-200 rounded-lg p-4 mb-6">
                                <h3 className="text-lg font-medium text-blue-800 mb-4">Articles disponibles</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-blue-200">
                                        <thead className="bg-blue-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Article</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Description</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Quantité</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-blue-100">
                                            {selectedRequisition
                                                ?.items.map(item => (
                                                    <tr key={item.id} className="hover:bg-blue-50">
                                                        <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">{item.article.description}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-700">{parseInt(item.quantiteDemande)}</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <button
                                                                onClick={() => handleAddItem(item)}
                                                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
                                                            >
                                                                <Plus size={16} className="mr-1" />
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
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Article</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Quantité</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Stock disponible</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Fourniseur</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Type de Transaction</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-blue-100">
                                            {selectedItems.map(item => (
                                                <tr key={item.id} className="hover:bg-blue-50">
                                                    <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{item.quantiteDemande}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">0</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        <select
                                                            value={item.supplier}
                                                            onChange={(e) => handleSupplierChange(item.id, e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="">Choisissez un fournisseur</option>
                                                            {suppliers?.map(supplier => (
                                                                <option key={supplier.id} value={supplier.id}>
                                                                    {supplier.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        <div>
                                                            {transactionTypes.map(type => (
                                                                <label key={type.id} className="inline-flex items-center mr-4">
                                                                    <input
                                                                        type="radio"
                                                                        name={`transactionType-${item.id}`}
                                                                        value={type.type}
                                                                        checked={item.transactionType === type.type}
                                                                        onChange={(e) => handleTransactionTypeChange(item.id, e.target.value)}
                                                                    />
                                                                    <span className="ml-2">{type.name}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">

                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
                                                        >
                                                            <Trash2 size={16} className="mr-1" />
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
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Article</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Quantité</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Prix unitaire (€)</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Prix total (€)</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-blue-100">
                                    {selectedItems.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.article.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{item.article.description}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.quantiteDemande}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item?.unitPrice || 0}
                                                    onChange={(e) => handleUnitPriceChange(item.id, parseFloat(e.target.value) || 0)}
                                                    className="w-24 p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-blue-700">
                                                {item.unitPrice ? (item.unitPrice * item.quantity).toFixed(2) : "0.00"}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50">
                                        <td colSpan={4} className="px-4 py-3 text-right text-sm font-medium text-blue-800">Total</td>
                                        <td className="px-4 py-3 text-sm font-bold text-blue-800">{grandTotal.toFixed(2)} €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {priorities.map(p => (
                                    <label key={p.value} className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
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
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    multiple
                                />
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

            // case 3:
            //     return (
            //         <div className="p-6 bg-white rounded-b-lg shadow-md">
            //             <div className="grid grid-cols-1 gap-6">
            //                 <div>
            //                     <label className="block text-sm font-medium text-gray-700 mb-2">Type de Transaction</label>
            //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            //                         {transactionTypes.map(type => {
            //                             let Icon
            //                             switch (type.icon) {
            //                                 case "Package":
            //                                     Icon = Package
            //                                     break
            //                                 case "CreditCard":
            //                                     Icon = CreditCard
            //                                     break
            //                                 case "DollarSign":
            //                                     Icon = DollarSign
            //                                     break
            //                                 default:
            //                                     Icon = Package
            //                             }

            //                             return (
            //                                 <label key={type.id} className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
            //                                     <input
            //                                         type="radio"
            //                                         checked={transactionType === type.type}
            //                                         onChange={() => setTransactionType(type.type)}
            //                                         className="w-4 h-4 text-blue-600"
            //                                     />
            //                                     <div className="ml-2">
            //                                         <div className="flex items-center gap-1.5">
            //                                             <Icon size={16} className={`text-${type.type === 'stock' ? 'blue' : type.type === 'credit' ? 'orange' : 'green'}-600`} />
            //                                             <span className="text-sm font-medium">{type.name}</span>
            //                                         </div>
            //                                         <p className="text-xs text-gray-500 mt-1">{type.description}</p>
            //                                     </div>
            //                                 </label>
            //                             )
            //                         })}
            //                     </div>
            //                 </div>

            //                 {/* {transactionType === "credit" && (
            //                     <div className="p-4 border rounded-md bg-orange-50 border-orange-200">
            //                         <h4 className="text-sm font-medium text-orange-800 mb-2 flex items-center gap-2">
            //                             <AlertCircle size={16} />
            //                             Option de paiement anticipé
            //                         </h4>
            //                         <div className="flex flex-col">
            //                             <label className="text-sm text-gray-700 mb-1">Montant d'avance (%)</label>
            //                             <input
            //                                 type="range"
            //                                 min="0"
            //                                 max="50"
            //                                 step="5"
            //                                 value={advancePayment}
            //                                 onChange={(e) => setAdvancePayment(parseInt(e.target.value))}
            //                                 className="w-full accent-orange-500"
            //                             />
            //                             <div className="flex justify-between text-xs text-gray-500 mt-1">
            //                                 <span>0%</span>
            //                                 <span>Paiement d'avance: {advancePayment}%</span>
            //                                 <span>50%</span>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )} */}
            //             </div>
            //         </div>
            //     )

            case 3:
                return (
                    <div className="p-6 bg-white rounded-b-lg shadow-md">

                        <div className="bg-green-50 mb-4 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="text-sm text-green-700 font-medium">Prêt à soumettre</p>
                                <p className="text-sm text-green-700 mt-1">
                                    Veuillez vérifier les informations ci-dessous avant de soumettre votre réquisition.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                            <h3 className="text-lg font-medium text-blue-800 mb-2">Récapitulatif de la demande</h3>
                            <p className="text-sm text-blue-700 mb-4">Veuillez vérifier les informations ci-dessous avant de soumettre votre demande.</p>

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
                                    <p className="text-sm font-medium text-blue-700">Type de transaction:</p>
                                    <p className="text-sm text-gray-700">
                                        {transactionTypes.find(t => t.type === transactionType)?.name || "Non spécifié"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Priorité:</p>
                                    <p className="text-sm text-gray-700">
                                        {priorities.find(p => p.value === priority)?.label || "Non spécifiée"}
                                    </p>
                                </div>
                                {transactionType === "credit" && (
                                    <div>
                                        <p className="text-sm font-medium text-blue-700">Paiement d'avance:</p>
                                        <p className="text-sm text-gray-700">{advancePayment}%</p>
                                    </div>
                                )}
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
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Article</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Quantité</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Prix unitaire</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Prix total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-blue-100">
                                    {selectedItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.quantity}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.unitPrice?.toFixed(2)} €</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{(item.unitPrice && item.quantity) ? (item.unitPrice * item.quantity).toFixed(2) : "0.00"} €</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50">
                                        <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-blue-800">Total</td>
                                        <td className="px-4 py-3 text-sm font-bold text-blue-800">{grandTotal.toFixed(2)} €</td>
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

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

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
        <div className="max-w-8xl max-h-[95%] mx-auto bg-gray-50 rounded-lg shadow-lg overflow-y-scroll">

            <StepIndicator currentStep={currentStep} steps={steps} />

            {renderStepContent()}

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
                    className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {currentStep === steps.length
                        ? (isSubmitting ? "Envoi en cours..." : "Soumettre")
                        : "Suivant"}
                </button>
            </div>

            {renderModal()}
        </div>
    )
}

export default ApprovitionForm
