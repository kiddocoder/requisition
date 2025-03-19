import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import StepOneSignup from "../components/forms/signup/StepOneSignup";
import StepTwoSignup from "../components/forms/signup/StepTwoSignup";
import { signUpUser } from "../api/users";

export default function SignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        enterprise_id: "",
        post: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signUpUser(formData);

            // Vérification simple (à remplacer par un vrai appel API)
            if (formData.email && formData.password && formData.confirmPassword && formData.enterprise_id) {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Les mots de passe ne correspondent pas");
                }
                console.log("Inscription réussie!", { email: formData.email, enterprise_id: formData.enterprise_id });
                setSuccess(true);

                // Rediriger après inscription réussie
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                throw new Error("Veuillez remplir tous les champs");
            }
        } catch (err: any) {
            console.error("Erreur d'inscription:", err);
            setError(err.message || "Une erreur est survenue lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!formData.username || !formData.enterprise_id || !formData.post) {
                setError("Veuillez remplir tous les champs");
                return;
            }
            setStep(2);
        }
    };

    const handlePreviousStep = () => setStep(step - 1);

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
                        {step === 1 && <StepOneSignup formData={formData} handleChange={handleChange} />}
                        {step === 2 && <StepTwoSignup formData={formData} handleChange={handleChange} />}

                        <div className="flex items-center justify-between">
                            {step > 1 && (
                                <button
                                    type="button"
                                    className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={handlePreviousStep}
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Précédent
                                </button>
                            )}
                            {step < 2 ? (
                                <button
                                    type="button"
                                    className="w-full py-2.5 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={handleNextStep}
                                >
                                    Suivant
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={`py-2.5 px-4 rounded-md text-white font-medium ${loading
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "En cours..." : "S'inscrire"}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}