"use client"

import type React from "react"

import { useState } from "react"
import type { FormErrors, RequisitionFormData, RequisitionModalProps, Step } from "../../../types/requisition"
import { StepIndicator } from "../step-indicator"
import { ModalFooter } from "./modal-footer"
import { ModalHeader } from "./modal-header"
import { StepOne } from "./step-one"
import { StepThree } from "./step-three"
import { StepTwo } from "./step-two"

import { useAddRequisition } from "../../../hooks/apiFeatures/useRequisitions"
import { useFetchArticles } from "../../../hooks/apiFeatures/useArticles"

export const RequisitionModal: React.FC<RequisitionModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(1)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: articles = [] } = useFetchArticles()


    const addRequisitionMutation = useAddRequisition()

    // Initialisation avec une structure de données simplifiée
    const [formData, setFormData] = useState<RequisitionFormData>({
        titre: "",
        objet: "",
        date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD pour l'input date
        items: [],
    })

    const steps: Step[] = [
        { id: 1, label: "Réquisition" },
        { id: 2, label: "Articles" },
        { id: 3, label: "Révision" },
    ]

    const validateStep = (currentStep: number): boolean => {
        const newErrors: FormErrors = {}

        if (currentStep === 1) {
            if (!formData.titre) newErrors.titre = "Le titre est requis"
            if (!formData.objet) newErrors.objet = "L'objet de la réquisition est requis"
            if (!formData.date) newErrors.date = "La Date de demande est requise"
        } else if (currentStep === 2) {
            if (formData.items.length === 0) {
                // Afficher un toast au lieu de bloquer la progression
                // toast({
                //     title: "Attention",
                //     description: "Aucun article n'a été ajouté à la réquisition",
                //     variant: "warning",
                // })
                // On permet quand même de passer à l'étape suivante
                return true
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors)
            return false
        }

        return true
    }

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1)
            setFormErrors({})
        }
    }

    const prevStep = () => {
        setStep(step - 1)
        setFormErrors({})
    }

    const handleSubmit = async () => {
        try {
            // Préparer les données pour l'API
            const apiData = prepareDataForApi(formData)

            // Soumettre les données
            setIsSubmitting(true)
            await addRequisitionMutation.mutateAsync(apiData).finally(() => {
                setIsSubmitting(false)
            })

            // Notification de succès
            // toast({
            //     title: "Succès",
            //     description: "Réquisition soumise avec succès!",
            //     variant: "success",
            // })

            // Fermer le modal
            onClose()
        } catch (error) {
            // toast({
            //     title: "Erreur",
            //     description: "Une erreur est survenue lors de la soumission",
            //     variant: "destructive",
            // })
            console.error("Erreur lors de la soumission:", error)
        }
    }

    // Fonction pour préparer les données avant envoi à l'API
    const prepareDataForApi = (data: RequisitionFormData) => {
        // Séparer les nouveaux articles et les articles existants
        const newItems = data.items
            .filter((item) => item.isNew)
            .map(({ isNew, ...item }) => ({
                name: item.name,
                uniteMesure: item.uniteMesure,
                quantiteDemande: item.quantiteDemande,
            }))

        const existingItems = data.items
            .filter((item) => !item.isNew)
            .map(({ isNew, ...item }) => ({
                article_id: item.article_id,
                uniteMesure: item.uniteMesure,
                quantiteDemande: item.quantiteDemande,
            }))

        return {
            ...data,
            newItems,
            items: existingItems,
        }
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }

    const isNextDisabled = () => {
        if (step === 1) {
            return !formData.titre || !formData.objet || !formData.date
        }
        return false
    }

    const renderStep = () => {
        const commonProps = {
            formData,
            setFormData,
            errors: formErrors,
            setErrors: setFormErrors,
            onNext: nextStep,
            onPrevious: prevStep,
            articles: articles
        }

        switch (step) {
            case 1:
                return <StepOne {...commonProps} />
            case 2:
                return <StepTwo {...commonProps} />
            case 3:
                return <StepThree {...commonProps} />
            default:
                return null
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${isFullScreen ? "p-0" : "p-4"}`}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-full overflow-hidden flex flex-col transition-all duration-300 ease-in-out 
                ${isFullScreen ? "h-full max-w-full" : "max-w-3xl max-h-[90vh]"}`}
            >
                <ModalHeader
                    title="Formulaire de Réquisition"
                    isFullScreen={isFullScreen}
                    toggleFullScreen={toggleFullScreen}
                    onClose={onClose}
                />

                <StepIndicator currentStep={step} steps={steps} />

                <div className="p-4 md:p-6 overflow-y-auto flex-grow">{renderStep()}</div>

                <ModalFooter
                    step={step}
                    totalSteps={steps.length}
                    onPrevious={prevStep}
                    onNext={nextStep}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isNextDisabled={isNextDisabled()}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

