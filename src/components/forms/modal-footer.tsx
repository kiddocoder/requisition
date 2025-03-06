"use client"

import type React from "react"

import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import type { ModalFooterProps } from "../../types/requisition"

export const ModalFooter: React.FC<ModalFooterProps> = ({
    step,
    totalSteps,
    onPrevious,
    onNext,
    onSubmit,
    onCancel,
    isNextDisabled = false,
}) => {
    return (
        <div className="border-t border-gray-200 p-4 flex justify-between bg-gray-50">
            <div>
                {step > 1 && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Retour
                    </button>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Annuler
                </button>
                {step < totalSteps ? (
                    <button
                        type="button"
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 ${isNextDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        Suivant
                        <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                        <Send size={18} />
                        Envoyer la Réquisition
                    </button>
                )}
            </div>
        </div>
    )
}

