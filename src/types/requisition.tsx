export type TransactionType = "stock" | "credit" | "cash"
export type PriorityType = "low" | "normal" | "high"

import type React from "react"
export interface Article {
    id: number
    name: string
    uniteMesure: string
}

export interface RequisitionItem {
    id?: number
    article_id?: number | null
    name?: string
    uniteMesure: string
    quantiteDemande: number
    isNew: boolean
}

export interface RequisitionFormData {
    titre: string
    objet: string
    date: string
    items: RequisitionItem[]
    comment?: string
    demendeur_id?: number | null
    enterprise_id?: number | null
}

export interface FormErrors {
    [key: string]: string | null
}

export interface StepProps {
    formData: RequisitionFormData
    setFormData: React.Dispatch<React.SetStateAction<RequisitionFormData>>
    errors?: FormErrors
    setErrors?: React.Dispatch<React.SetStateAction<FormErrors>>
    onNext?: () => void
    onPrevious?: () => void
    articles?: any[]
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

export interface Step {
    id: number
    label: string
}
