import React from "react"
import type { StepIndicatorProps } from "../../../types/requisition"

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
    return (
        <div className="px-6 pt-4 pb-4 bg-white">
            <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={`flex items-center ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep >= step.id ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
                            >
                                {step.id}
                            </div>
                            <span className="ml-2 text-sm font-medium">{step.label}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 border-t-2 mx-4 ${currentStep > step.id ? "border-blue-600" : "border-gray-200"}`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

