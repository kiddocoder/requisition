import { useState } from "react";
import { FormErrors, RequisitionModalProps } from "../../../types/requisition";
import { StepIndicator } from "../step-indicator";
import { ModalFooter } from "./modal-footer";
import { ModalHeader } from "./modal-header";
import { StepOne } from "./step-one";
import { StepThree } from "./step-three";
import { StepTwo } from "./step-two";
import { useNavigate } from "react-router-dom";

export const RequisitionModal: React.FC<RequisitionModalProps> = ({ onClose }) => {
    const [step, setStep] = useState(1)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titre: "",
        objet: "",
        date: new Date(Date.now()),
        items: [],
    })

    const steps = [
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
        navigate("/approvisionnement")
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }

    const isNextDisabled = () => {
        if (step === 1) {
            return !formData.titre || !formData.objet
        }
        // Ajoutez des conditions pour les autres étapes si nécessaire
        return false
    }

    const renderStep = () => {
        const commonProps = {
            formData,
            setFormData,
            errors: formErrors,
            setErrors: setFormErrors,
            onNext: nextStep,
            onPrevious: prevStep
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
                />
            </div>
        </div>
    )
}