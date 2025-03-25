export type TransactionType = "stock" | "credit" | "cash"
export type PriorityType = "low" | "normal" | "high"

export interface RequisitionItem {
    id: number;
    designation?: string;
    uniteMesure?: string;
    quantiteDemande?: string;
    quantiteRequisition?: string;
    article_id?: number | null;
    name?: string;
    _uiData?: {
        designation?: string;
        uniteMesure?: string;
        quantiteDemande?: string;
    };
}

export interface RequisitionFormData {
    titre: string,
    objet: string,
    date: Date | null,
    items: any[],
    demendeur_id: null,
    enterprise_id: null,
    newItems: [],
    comment: null
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

