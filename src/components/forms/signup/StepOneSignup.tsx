
import posts from "../../../stores/posts"
import { useFetchEnterprises } from "../../../hooks/apiFeatures/useEnterprises";
const StepOneSignup = ({ formData, handleChange }: any) => {
    const { data: enterprises = [] } = useFetchEnterprises()
    return (
        <>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-blue-900 mb-1">
                    Username
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        className="w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="enterprise" className="block text-sm font-medium text-blue-900 mb-1">
                    Entreprise
                </label>
                <div className="relative">
                    <select
                        name="enterprise_id"
                        className="w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.enterprise_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Nom de l'entreprise</option>
                        {enterprises.map((enterprise: any) => (
                            <option key={enterprise.id} value={enterprise.id}>
                                {enterprise.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="post" className="block text-sm font-medium text-blue-900 mb-1">
                    Votre post
                </label>
                <div className="relative">
                    <select
                        name="post"
                        className="w-full p-2.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.post}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Votre post dans l'entreprise</option>
                        {posts.map((post) => (
                            <option key={post.id} value={post.id}>
                                {post.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}

export default StepOneSignup;