import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogIn, UserPlus, ArrowRight, CheckCircle, DollarSign, Clipboard } from 'lucide-react';

const Onboarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Données des témoignages
    const testimonials = [
        {
            id: 1,
            name: "Sophie Martin",
            role: "Directrice Financière",
            company: "Groupe Lumina",
            avatar: "/api/placeholder/60/60",
            text: "Ce système a transformé notre processus de réquisition. Nous avons réduit notre temps de traitement de 70% et gagné en transparence."
        },
        {
            id: 2,
            name: "Thomas Dubois",
            role: "Responsable Achats",
            company: "Tech Solutions",
            avatar: "/api/placeholder/60/60",
            text: "L'interface intuitive nous permet de gérer efficacement toutes nos demandes. La validation en plusieurs étapes assure un contrôle parfait des dépenses."
        },
        {
            id: 3,
            name: "Julie Leroy",
            role: "Directrice Administrative",
            company: "Innov Santé",
            avatar: "/api/placeholder/60/60",
            text: "Après 6 mois d'utilisation, nous avons constaté une réduction des erreurs de 85% et une meilleure coordination entre nos départements."
        }
    ];

    // Auto-rotation pour le slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Gestion des flèches du slider
    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Bannière immersive avec waves et dégradés */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-700">
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            fill="rgba(255, 255, 255, 0.1)"
                            d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,122.7C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                        <path
                            fill="rgba(255, 255, 255, 0.2)"
                            d="M0,256L48,240C96,224,192,192,288,176C384,160,480,160,576,181.3C672,203,768,245,864,240C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                {/* CTA en haut */}
                <div className="absolute top-4 right-4 flex space-x-3 z-10">
                    <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2">
                        <LogIn size={18} />
                        <span>Se connecter</span>
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2">
                        <UserPlus size={18} />
                        <span>Créer un compte</span>
                    </button>
                </div>

                {/* Contenu central de la bannière */}
                <div className="max-w-4xl mx-auto text-center px-6 z-10">
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Simplifiez vos demandes de réquisition</h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-10">Une plateforme intuitive pour gérer l'ensemble du processus d'achat, de la demande à l'approbation</p>
                        <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg font-semibold hover:bg-indigo-50">
                            Commencer maintenant
                        </button>
                    </div>
                </div>

                {/* Effet de lumière radiale */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-700"></div>
            </div>

            {/* Résumé du processus */}
            <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Comment ça fonctionne</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Étape 1 */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <UserPlus className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Création de compte</h3>
                            <p className="text-gray-600">Créez votre compte et connectez-vous pour accéder à votre espace personnel</p>
                            <div className="mt-4 flex justify-center">
                                <span className="inline-flex items-center text-indigo-600 font-medium">
                                    Étape 1 <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Étape 2 */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <Clipboard className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Demande d'articles</h3>
                            <p className="text-gray-600">Créez vos demandes en précisant les articles et les quantités nécessaires</p>
                            <div className="mt-4 flex justify-center">
                                <span className="inline-flex items-center text-indigo-600 font-medium">
                                    Étape 2 <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Étape 3 */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <DollarSign className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Validation et prix</h3>
                            <p className="text-gray-600">Les services concernés valident et ajoutent les prix unitaires à vos demandes</p>
                            <div className="mt-4 flex justify-center">
                                <span className="inline-flex items-center text-indigo-600 font-medium">
                                    Étape 3 <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Étape 4 */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Approbation finale</h3>
                            <p className="text-gray-600">Envoi vers la comptabilité puis validation par la direction générale</p>
                            <div className="mt-4 flex justify-center">
                                <span className="inline-flex items-center text-indigo-600 font-medium">
                                    Étape 4 <CheckCircle className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Témoignages avec slider */}
            <div className="py-20 bg-indigo-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Ce qu'en disent nos clients</h2>

                    <div className="relative">
                        {/* Les témoignages */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                        <div className="bg-white rounded-xl p-8 shadow-lg">
                                            <div className="flex items-center mb-6">
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-14 h-14 rounded-full mr-4"
                                                />
                                                <div>
                                                    <h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
                                                    <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-lg italic">{testimonial.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation du slider */}
                        <button
                            onClick={handlePrevSlide}
                            className="absolute top-1/2 left-0 -ml-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <button
                            onClick={handleNextSlide}
                            className="absolute top-1/2 right-0 -mr-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Indicateurs */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Réquisition Pro</h3>
                            <p className="text-gray-400">Simplifiez et optimisez votre processus de réquisition d'entreprise avec notre solution cloud innovante.</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutoriels</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="text-gray-400">contact@requisitionpro.com</li>
                                <li className="text-gray-400">+33 (0)1 23 45 67 89</li>
                                <li className="text-gray-400">42 rue des Innovations, 75001 Paris</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-700 text-center text-gray-500">
                        <p>&copy; 2025 Réquisition Pro. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Onboarding;