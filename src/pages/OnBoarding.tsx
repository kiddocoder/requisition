import { LogIn, UserPlus, ArrowRight, CheckCircle, DollarSign, Clipboard } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import BannerImage from "../assets/purchaserequisition.png";
import testimonials from "../stores/testimonials";
import { Link, useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Bannière immersive avec waves et dégradés */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden  bg-[#5479f7]">

                {/* CTA en haut */}
                <div className="absolute top-4 right-4 flex space-x-3 z-10">
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2">
                        <LogIn size={18} />
                        <span>Se connecter</span>
                    </Link>
                </div>

                {/* Contenu central de la bannière */}
                <div className="mx-auto text-center px-6 z-10">
                    <div className='flex flex-col md:flex-row  items-center py-8 px-8 bg-[#5479f7]'>
                        <div className="animate-fade-in">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Simplifiez vos demandes de réquisition</h1>
                            <p className="text-xl md:text-2xl text-blue-100 mb-10">Une plateforme intuitive pour gérer l'ensemble du processus d'achat, de la demande à l'approbation</p>
                            <button
                                onClick={() => navigate("/inscription")}
                                className="px-8 py-4 bg-white text-indigo-600 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg font-semibold hover:bg-indigo-50">
                                Commencer maintenant
                            </button>
                        </div>

                        <img src={BannerImage} className='hidden md:block w-full h-full object-cover' alt="banner" />
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

            {/* Section Témoignages avec Splide */}
            <div className="py-20 bg-indigo-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Ce qu'en disent nos clients</h2>

                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 2,
                            autoplay: true,
                            interval: 5000,
                            pauseOnHover: true,
                            pagination: true,
                            arrows: false,
                            breakpoints: {
                                1024: {
                                    perPage: 2,
                                },
                                640: {
                                    perPage: 1,
                                },
                            },
                        }}
                    >
                        {
                            testimonials.map((testimonial) => (
                                <SplideSlide key={testimonial.id}>
                                    <div className="bg-white rounded-xl p-8 shadow-lg mx-4">
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
                                </SplideSlide>
                            ))
                        }

                    </Splide>
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
                        <p>&copy; 2025 <a target='_blank' href="https://www.github.com/kiddocoder/" className="text-blue-500 hover:underline">KiddoPro_Dev</a>, Requisition Pro Inc.'. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default Onboarding;