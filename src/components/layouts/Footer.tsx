"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Twitter, Mail, Code, Heart, Coffee, ExternalLink, Calendar, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [showContact, setShowContact] = useState(false)
    const [coffeeCount, setCoffeeCount] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)

    // Mettre à jour l'heure toutes les secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
    }

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(date)
    }

    const handleCoffeeClick = () => {
        setCoffeeCount((prev) => prev + 1)

        // Easter egg: après 5 clics
        if (coffeeCount === 4) {
            alert("☕ Merci pour le café! Je vais coder comme un pro maintenant!")
        }
    }

    return (
        <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-4 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo et info */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3"
                        >
                            <Code size={20} />
                        </motion.div>
                        <div>
                            <h3 className="font-bold text-lg">kiddo_pro_dev</h3>
                            <p className="text-xs text-blue-300">Développeur Full-Stack Professionnel</p>
                        </div>
                    </div>

                    {/* Date et heure */}
                    <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(currentTime)}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{formatTime(currentTime)}</span>
                        </div>
                    </div>

                    {/* Boutons sociaux */}
                    <div className="flex space-x-3">
                        <motion.a
                            href="https://github.com/kiddocoder"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </motion.a>
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </motion.a>
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={16} />
                        </motion.a>
                        <motion.button
                            whileHover={{ y: -5 }}
                            onClick={() => setShowContact(!showContact)}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            aria-label="Contact"
                        >
                            <Mail size={16} />
                        </motion.button>
                        <motion.button
                            whileHover={{ y: -5, rotate: 15 }}
                            onClick={handleCoffeeClick}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors relative"
                            aria-label="Buy me a coffee"
                        >
                            <Coffee size={16} />
                            {coffeeCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {coffeeCount}
                                </span>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Contact form popup */}
                <AnimatePresence>
                    {showContact && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-4 p-4 bg-gray-800 rounded-lg"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-medium">Contactez-moi</h4>
                                <button onClick={() => setShowContact(false)} className="text-gray-400 hover:text-white">
                                    &times;
                                </button>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">Envoyez-moi un message pour discuter de votre projet</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="flex-1 p-2 bg-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md transition-colors">Envoyer</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expand button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-gray-400 hover:text-white flex items-center"
                    >
                        {isExpanded ? "Moins d'infos" : "Plus d'infos"}
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="ml-1">
                            ▼
                        </motion.span>
                    </button>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h5 className="font-medium mb-2 text-sm">À propos</h5>
                                    <p className="text-xs text-gray-300">
                                        Développeur passionné avec expertise en React, TypeScript et Node.js. Spécialisé dans la création
                                        d'applications web modernes et performantes.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-medium mb-2 text-sm">Projets récents</h5>
                                    <ul className="text-xs text-gray-300 space-y-1">
                                        <li className="flex items-center">
                                            <ExternalLink size={12} className="mr-1" />
                                            <a href="#" className="hover:text-blue-300 transition-colors">
                                                Système de Réquisition
                                            </a>
                                        </li>
                                        <li className="flex items-center">
                                            <ExternalLink size={12} className="mr-1" />
                                            <a href="#" className="hover:text-blue-300 transition-colors">
                                                Plateforme E-commerce
                                            </a>
                                        </li>
                                        <li className="flex items-center">
                                            <ExternalLink size={12} className="mr-1" />
                                            <a href="#" className="hover:text-blue-300 transition-colors">
                                                Dashboard Analytics
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-medium mb-2 text-sm">Technologies</h5>
                                    <div className="flex flex-wrap gap-1">
                                        {["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "MongoDB"].map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Copyright */}
                <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>© {currentTime.getFullYear()} kiddo_pro_dev. Tous droits réservés.</p>
                    <div className="flex items-center mt-2 md:mt-0">
                        <span>Fait avec</span>
                        <Heart size={12} className="mx-1 text-red-500" />
                        <span>et beaucoup de</span>
                        <Coffee size={12} className="mx-1 text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Version badge */}
            <div className="absolute top-0 right-0 transform -translate-y-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                v1.0.0
            </div>
        </footer>
    )
}

