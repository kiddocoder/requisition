export type TransactionType = "stock" | "credit" | "cash"
export type PriorityType = "low" | "normal" | "high"

export interface RequisitionItem {
    id?: string
    designation: string
    uniteMesure: string
    quantiteDemande: string
    quantiteRequisition: string
    prixUnitaire: string
    prixTotal: string
    type: TransactionType
    advancePayment: string
}

export interface RequisitionFormData {
    title: string
    items: RequisitionItem[]
    supplier: string
    department: string
    requisitionDate: string
    comments: string
    priority: PriorityType
}

export interface FormErrors {
    [key: string]: string | null
}

export interface StepProps {
    formData: RequisitionFormData
    updateFormData: (data: Partial<RequisitionFormData>) => void
    errors: FormErrors
    setErrors: (errors: FormErrors) => void
    onNext: () => void
    onPrevious: () => void
    calculateGrandTotal: () => number
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

