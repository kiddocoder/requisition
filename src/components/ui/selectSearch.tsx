"use client"

import React, { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, X, Plus } from 'lucide-react'
import { cn } from "../lib/cn"

export type SelectOption = {
    value: string
    label: string
}

type SelectSearchProps = {
    options: SelectOption[]
    value?: SelectOption | null
    onChange: (value: SelectOption | null) => void
    onAddNewItem?: (value: string) => void
    placeholder?: string
    className?: string
    renderAddComponent?: React.ReactNode
    isSearchable?: boolean
    disabled?: boolean
}

const SelectSearch = ({
    options,
    value,
    onChange,
    onAddNewItem,
    placeholder = "Select an option...",
    className = "",
    renderAddComponent,
    isSearchable = true,
    disabled = false,
}: SelectSearchProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddNew, setShowAddNew] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const addNewInputRef = useRef<HTMLInputElement>(null)

    // Filter options based on search term
    const filteredOptions = searchTerm
        ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : options

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
                setShowAddNew(false)
                setSearchTerm("")
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    // Position dropdown when it opens
    useEffect(() => {
        if (isOpen && containerRef.current && dropdownRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const dropdownEl = dropdownRef.current

            // Set width to match container
            dropdownEl.style.width = `${containerRect.width}px`

            // Calculate position
            const spaceBelow = window.innerHeight - containerRect.bottom
            const spaceAbove = containerRect.top
            const dropdownHeight = Math.min(300, dropdownEl.scrollHeight) // Max height of dropdown

            // Position below if enough space, otherwise above
            if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
                dropdownEl.style.top = `${containerRect.bottom + window.scrollY + 5}px`
                dropdownEl.style.bottom = 'auto'
            } else {
                dropdownEl.style.bottom = `${window.innerHeight - containerRect.top + window.scrollY + 5}px`
                dropdownEl.style.top = 'auto'
            }

            dropdownEl.style.left = `${containerRect.left + window.scrollX}px`
        }
    }, [isOpen, filteredOptions, showAddNew])

    // Focus on search input when dropdown opens
    useEffect(() => {
        if (isOpen && inputRef.current && isSearchable) {
            inputRef.current.focus()
        }
    }, [isOpen, isSearchable])

    // Focus on add new input when showing
    useEffect(() => {
        if (showAddNew && addNewInputRef.current) {
            addNewInputRef.current.focus()
        }
    }, [showAddNew])

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
            if (!isOpen) {
                setSearchTerm("")
                setShowAddNew(false)
            }
        }
    }

    const handleSelectOption = (option: SelectOption) => {
        onChange(option)
        setIsOpen(false)
        setSearchTerm("")
    }

    const handleClearSelection = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(null)
        setSearchTerm("")
    }

    const handleAddNewClick = () => {
        setShowAddNew(true)
    }

    const handleAddNewSubmit = (newValue: string) => {
        if (onAddNewItem && newValue.trim()) {
            onAddNewItem(newValue.trim())
            setShowAddNew(false)
            setSearchTerm("")
        }
    }

    return (
        <div ref={containerRef} className={cn("relative w-full", className, disabled && "opacity-60 cursor-not-allowed")}>
            {/* Main button */}
            <div
                onClick={toggleDropdown}
                className={cn(
                    "flex items-center justify-between w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm",
                    "cursor-pointer text-left focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                    "hover:border-gray-400 transition-colors",
                    isOpen && "border-blue-500 ring-1 ring-blue-500",
                    disabled && "bg-gray-100 cursor-not-allowed",
                )}
            >
                <div className="flex items-center flex-1 min-w-0">
                    {value ? (
                        <span className="block truncate pr-2">{value.label}</span>
                    ) : (
                        <span className="block truncate text-gray-500">{placeholder}</span>
                    )}
                </div>
                <div className="flex items-center">
                    {value && (
                        <button
                            type="button"
                            onClick={handleClearSelection}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={disabled}
                        >
                            <X size={16} />
                        </button>
                    )}
                    <span className="ml-1 text-gray-500">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                    {/* Search box */}
                    {isSearchable && (
                        <div className="sticky top-0 p-2 bg-white border-b border-gray-200 z-10">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full py-2 pl-8 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Type to search..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    {/* Add new option */}
                    {showAddNew ? (
                        renderAddComponent ? (
                            <div onClick={(e) => e.stopPropagation()}>{renderAddComponent}</div>
                        ) : (
                            <NewItemInput ref={addNewInputRef} onSubmit={handleAddNewSubmit} onCancel={() => setShowAddNew(false)} />
                        )
                    ) : (
                        onAddNewItem && (
                            <div
                                onClick={handleAddNewClick}
                                className="flex items-center gap-2 p-2.5 text-blue-600 hover:bg-blue-50 cursor-pointer"
                            >
                                <Plus size={16} />
                                <span className="font-medium">Ajouter une option</span>
                            </div>
                        )
                    )}

                    {/* No results message */}
                    {filteredOptions.length === 0 && !showAddNew && (
                        <div className="p-3 text-sm text-center text-gray-500">Aucun résultat trouvé</div>
                    )}

                    {/* Options list */}
                    {filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelectOption(option)}
                            className={cn(
                                "p-2.5 cursor-pointer hover:bg-gray-100",
                                value?.value === option.value && "bg-blue-50 text-blue-700 font-medium",
                            )}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

type NewItemInputProps = {
    onSubmit: (value: string) => void
    onCancel: () => void
}

const NewItemInput = React.forwardRef<HTMLInputElement, NewItemInputProps>(({ onSubmit, onCancel }, ref) => {
    const [value, setValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit(value)
        } else if (e.key === "Escape") {
            onCancel()
        }
    }

    const handleSubmitClick = () => {
        if (value.trim()) {
            onSubmit(value)
        }
    }

    return (
        <div className="p-2 border-b border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 w-full">
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="py-2 w-full px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Entrer le nom du fournisseur..."
                />
                {/* <button
                    type="button"
                    onClick={handleSubmitClick}
                    className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Plus size={16} />
                </button> */}
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
})

NewItemInput.displayName = "NewItemInput"

export default SelectSearch
