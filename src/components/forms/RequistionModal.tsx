"use client"

import type React from "react"

import { useState } from "react"
import type { RequisitionModalProps, RequisitionFormData, FormErrors, PriorityType } from "../../types/requisition"
import { StepIndicator } from "./step-indicator"
import { ModalHeader } from "./modal-header"
import { ModalFooter } from "./modal-footer"
import { StepOne } from "./steps/step-one"
import { StepTwo } from "./steps/step-two"
import { StepThree } from "./steps/step-three"

export const RequisitionModal: React.FC<RequisitionModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(1)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const [formData, setFormData] = useState<RequisitionFormData>({
        title: "",
        items: [],
        supplier: "",
        department: "",
        requisitionDate: new Date().toISOString().split("T")[0],
        comments: "",
        priority: "normal" as PriorityType,
    })

    const steps = [
        { id: 1, label: "Articles" },
        { id: 2, label: "Détails" },
        { id: 3, label: "Révision" },
    ]

    const updateFormData = (data: Partial<RequisitionFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }))
    }

    const calculateGrandTotal = (): number => {
        return formData.items.reduce((sum, item) => sum + Number.parseFloat(item.prixTotal || "0"), 0)
    }

    const validateStep = (currentStep: number): boolean => {
        const newErrors: FormErrors = {}

        if (currentStep === 1) {
            if (formData.items.length === 0) {
                alert("Veuillez ajouter au moins un article à la réquisition")
                return false
            }
        }

        if (currentStep === 2) {
            if (!formData.title) newErrors.title = "Le titre est requis"
            if (!formData.supplier) newErrors.supplier = "Le fournisseur est requis"
            if (!formData.department) newErrors.department = "Le département est requis"

            if (Object.keys(newErrors).length > 0) {
                setFormErrors(newErrors)
                return false
            }
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

    const handleSubmit = () => {
        if (!validateStep(step)) return

        console.log("Réquisition soumise:", formData)

        // Afficher une notification de succès
        alert("Réquisition soumise avec succès!")
        onClose()
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }

    const renderStep = () => {
        const commonProps = {
            formData,
            updateFormData,
            errors: formErrors,
            setErrors: setFormErrors,
            onNext: nextStep,
            onPrevious: prevStep,
            calculateGrandTotal,
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
                    isNextDisabled={step === 1 && formData.items.length === 0}
                />
            </div>
        </div>
    )
}

