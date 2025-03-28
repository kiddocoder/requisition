"use client"

import type React from "react"
import { Loader2 } from "lucide-react"

interface ModalFooterProps {
    step: number
    totalSteps: number
    onPrevious: () => void
    onNext: () => void
    onSubmit: () => void
    onCancel: () => void
    isNextDisabled?: boolean
    isSubmitting?: boolean
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
    step,
    totalSteps,
    onPrevious,
    onNext,
    onSubmit,
    onCancel,
    isNextDisabled = false,
    isSubmitting = false,
}) => {
    return (
        <div className="p-4 border-t border-gray-100 flex justify-between">
            <div>
                {step > 1 && (
                    <button type="button" onClick={onPrevious} disabled={isSubmitting}>
                        Précédent
                    </button>
                )}
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={onCancel} disabled={isSubmitting}>
                    Annuler
                </button>

                {step < totalSteps ? (
                    <button type="button" onClick={onNext} disabled={isNextDisabled || isSubmitting}>
                        Suivant
                    </button>
                ) : (
                    <button type="button" onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Soumission...
                            </>
                        ) : (
                            "Soumettre"
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

