"use client"

import type React from "react"

import { X, ChevronDown } from "lucide-react"
import type { ModalHeaderProps } from "../../types/requisition"

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, isFullScreen, toggleFullScreen, onClose }) => {
    return (
        <div className="p-2 md:p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleFullScreen}
                    className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    aria-label={isFullScreen ? "Réduire" : "Plein écran"}
                >
                    {isFullScreen ? <ChevronDown size={20} /> : <span className="text-2xl">⤢</span>}
                </button>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    aria-label="Fermer"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}

