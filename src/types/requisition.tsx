export type TransactionType = "stock" | "credit" | "cash"
export type PriorityType = "low" | "normal" | "high"

export interface RequisitionItem {
    id?: string
    fourniseur: string,
    designation: string
    uniteMesure: string
    quantiteDemande: string
    quantiteRequisition: string
    prixUnitaire: string
    prixTotal: string
    type: TransactionType
    advancePayment: string,
    titre: string,
    objet: string,
    date: string | null,
}

export interface RequisitionFormData {
    titre: string,
    objet: string,
    date: string | null,
    items: any[]
}

export interface FormErrors {
    [key: string]: string | null
}

export interface StepProps {
    formData: RequisitionFormData
    setFormData: (data: Partial<RequisitionFormData>) => void
    errors: FormErrors
    setErrors: (errors: FormErrors) => void
    onNext: () => void
    onPrevious: () => void
}

export interface StepIndicatorProps {
    currentStep: number
    steps: { id: number; label: string }[]
}

export interface ModalFooterProps {
    step: number
    totalSteps: number
    onPrevious: () => void
    onNext: () => void
    onSubmit: () => void
    onCancel: () => void
    isNextDisabled?: boolean
}

export interface ModalHeaderProps {
    title: string
    isFullScreen: boolean
    toggleFullScreen: () => void
    onClose: () => void
}

export interface RequisitionModalProps {
    onClose: () => void
}

