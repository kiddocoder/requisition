import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const StepTwoSignup = ({ formData, handleChange }: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                    Adresse e-mail
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="nom@entreprise.com"
                        className="pl-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.email}
                        onChange={handleChange}
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
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.password}
                        onChange={handleChange}
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
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
        </>
    );
};

export default StepTwoSignup;