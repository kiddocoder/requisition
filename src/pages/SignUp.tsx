import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react"

export default function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [enterprise, setEnterprise] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Simuler un appel API
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Vérification simple (à remplacer par un vrai appel API)
            if (email && password && confirmPassword && enterprise) {
                if (password !== confirmPassword) {
                    throw new Error("Les mots de passe ne correspondent pas")
                }
                console.log("Inscription réussie!", { email, enterprise })
                setSuccess(true)

                // Rediriger après inscription réussie
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            } else {
                throw new Error("Veuillez remplir tous les champs")
            }
        } catch (err) {
            console.error("Erreur d'inscription:", err)
            setError(err.message || "Une erreur est survenue lors de l'inscription")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Inscription</h2>
                        <p className="text-blue-600 mt-1">Créez votre compte pour rejoindre notre communauté</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                            <p>Inscription réussie! Redirection en cours...</p>
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                                Adresse e-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="nom@entreprise.com"
                                    className="pl-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-1">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="pl-10 pr-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-blue-400 hover:text-blue-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>

                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-900 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    type="password"
                                    className="pl-10 pr-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-blue-400 hover:text-blue-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="enterprise" className="block text-sm font-medium text-blue-900 mb-1">
                                Entreprise
                            </label>
                            <div className="relative">
                                <input
                                    id="enterprise"
                                    type="text"
                                    placeholder="Nom de l'entreprise"
                                    className="w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={enterprise}
                                    onChange={(e) => setEnterprise(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 px-4 rounded-md text-white font-medium ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Inscription en cours..." : "S'inscrire"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-blue-700">
                            Vous avez déjà un compte?{" "}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
