import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Types pour les données
interface Item {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface Requisition {
    id: string;
    requestedBy: string;
    department: string;
    date: string;
    status: "pending" | "approved" | "rejected";
    items: Item[];
    totalAmount: number;
    comments: Comment[];
}

interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
}

// Données d'exemple
const sampleRequisition: Requisition = {
    id: "REQ-2023-001",
    requestedBy: "Jean Dupont",
    department: "Marketing",
    date: "2023-05-15",
    status: "pending",
    items: [
        { id: "1", name: "Ordinateur portable", quantity: 2, unitPrice: 1200, totalPrice: 2400 },
        { id: "2", name: "Écran 27 pouces", quantity: 3, unitPrice: 350, totalPrice: 1050 },
        { id: "3", name: "Clavier sans fil", quantity: 5, unitPrice: 80, totalPrice: 400 },
    ],
    totalAmount: 3850,
    comments: [
        {
            id: "c1",
            author: "Marie Lefevre",
            text: "Demande initiale reçue et en cours d'examen.",
            date: "2023-05-16",
        },
    ],
};

export default function RequisitionAccounter() {
    const [requisition, setRequisition] = useState<Requisition>(sampleRequisition);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const [selectedCaisse, setSelectedCaisse] = useState<string>("");
    const [selectedVoiture, setSelectedVoiture] = useState<string>("");

    const voitures = [{
        id: "1",
        marque: "Toyota",
        name: "Camry",
        couleur: "Noir",
        immatriculation: "ABC123"
    },
    {
        id: "2",
        marque: "Honda",
        name: "Civic",
        couleur: "Blanc",
        immatriculation: "DEF456"
    },
    {
        id: "3",
        marque: "Ford",
        name: "Mustang",
        couleur: "Rouge",
        immatriculation: "GHI789"
    }
    ];
    const caisses = [
        { id: "1", name: "Caisse 1", description: "Caisse de stockage" },
        { id: "2", name: "Caisse 2", description: "Caisse de stockage" },
        { id: "3", name: "Caisse 3", description: "Caisse de stockage" },
    ];

    // Fonction pour approuver la réquisition
    const approveRequisition = () => {
        setRequisition((prev) => ({
            ...prev,
            status: "approved",
            comments: [
                ...prev.comments,
                {
                    id: `c${prev.comments.length + 1}`,
                    author: "Service Comptabilité",
                    text: comment || "Réquisition approuvée. Budget disponible.",
                    date: new Date().toISOString().split("T")[0],
                },
            ],
        }));
        setComment("");
        setTimeout(() => {
            navigate("/direction")
        }, 2000)
    };

    // Fonction pour rejeter la réquisition
    const rejectRequisition = () => {
        setRequisition((prev) => ({
            ...prev,
            status: "rejected",
            comments: [
                ...prev.comments,
                {
                    id: `c${prev.comments.length + 1}`,
                    author: "Service Comptabilité",
                    text: comment || "Réquisition rejetée. Budget insuffisant.",
                    date: new Date().toISOString().split("T")[0],
                },
            ],
        }));
        setComment("");
    };

    // Fonction pour supprimer un article
    const removeItem = (itemId: string) => {
        const updatedItems = requisition.items.filter((item) => item.id !== itemId);
        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

        setRequisition((prev) => ({
            ...prev,
            items: updatedItems,
            totalAmount: newTotalAmount,
            comments: [
                ...prev.comments,
                {
                    id: `c${prev.comments.length + 1}`,
                    author: "Service Comptabilité",
                    text: `Article supprimé de la réquisition.`,
                    date: new Date().toISOString().split("T")[0],
                },
            ],
        }));
    };

    // Fonction pour annuler la réquisition
    const cancelRequisition = () => {
        setRequisition((prev) => ({
            ...prev,
            status: "rejected",
            comments: [
                ...prev.comments,
                {
                    id: `c${prev.comments.length + 1}`,
                    author: "Service Comptabilité",
                    text: "Réquisition annulée par le service comptabilité.",
                    date: new Date().toISOString().split("T")[0],
                },
            ],
        }));
    };

    return (
        <div className="container mx-auto mb-4 max-w-5xl py-6 px-4 mt-4 border border-gray-100 rounded-lg sm:px-6 lg:px-8">
            <div className="bg-white p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Révision de Réquisition - Service Comptabilité</h3>
                <p className="text-sm text-gray-600">Examiner et approuver les demandes de réquisition</p>

                {/* Informations de la réquisition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-blue-50 p-4 rounded-lg">
                    <div>
                        <p className="text-sm font-medium text-blue-700">Numéro de réquisition</p>
                        <p className="text-sm text-gray-900">{requisition.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-blue-700">Demandeur</p>
                        <p className="text-sm text-gray-900">{requisition.requestedBy}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-blue-700">Département</p>
                        <p className="text-sm text-gray-900">{requisition.department}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-blue-700">Date de demande</p>
                        <p className="text-sm text-gray-900">{requisition.date}</p>
                    </div>
                </div>

                {/* Articles demandés */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Articles demandés</h4>
                    <div className="overflow-x-auto border border-gray-200 p-2 rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-blue-700">#</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-blue-700">Description</th>
                                    <th className="px-4 py-2 text-right text-sm font-medium text-blue-700">Quantité</th>
                                    <th className="px-4 py-2 text-right text-sm font-medium text-blue-700">Prix unitaire</th>
                                    <th className="px-4 py-2 text-right text-sm font-medium text-blue-700">Prix total</th>
                                    <th className="px-4 py-2 text-right text-sm font-medium text-blue-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requisition.items.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-100 odd:bg-gray-100">
                                        <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                                        <td className="px-4 py-2 text-right text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-4 py-2 text-right text-sm text-gray-900">{item.unitPrice.toFixed(2)} €</td>
                                        <td className="px-4 py-2 text-right text-sm text-gray-900">{item.totalPrice.toFixed(2)} €</td>
                                        <td className="px-4 py-2 text-right">
                                            <button
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4} className="text-right text-sm font-bold text-gray-800">Total</td>
                                    <td className="text-right text-sm font-bold text-gray-800">{requisition.totalAmount.toFixed(2)} €</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Historique des commentaires */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Historique des commentaires</h4>
                    <div className="relative">
                        {/* Ligne verticale de la chronologie */}
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200"></div>

                        <ul className="list-none space-y-8 pl-8">
                            {requisition.comments
                                .slice()
                                .reverse()
                                .map((comment) => (
                                    <li key={comment.id} className="relative">
                                        {/* Point de la chronologie */}
                                        <div className="absolute -left-9 top-1.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>

                                        {/* Contenu du commentaire */}
                                        <div className="bg-gray-50/10 p-4 rounded-lg border border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <h5 className="text-sm font-semibold text-gray-800">
                                                    {comment.author}
                                                </h5>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(comment.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm mt-2 text-gray-700">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">

                    {/* choix de la caisse*/}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Choix de la caisse</h4>
                        <select
                            className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            value={selectedCaisse}
                            onChange={(e) => setSelectedCaisse(e.target.value)}
                        >
                            <option value="">Choisissez une caisse</option>
                            {caisses.map((caisse) => (
                                <option key={caisse.id} value={caisse.id}>
                                    {caisse.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*choix de la voiture*/}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Choix de la voiture</h4>
                        <select
                            className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            value={selectedVoiture}
                            onChange={(e) => setSelectedVoiture(e.target.value)}
                        >
                            <option value="">Choisissez une voiture</option>
                            {voitures.map((voiture) => (
                                <option key={voiture.id} value={voiture.id}>
                                    {voiture.name}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>



                {/* Ajouter un commentaire */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un commentaire</h4>
                    <textarea
                        className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Entrez votre commentaire ici..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {/* Boutons d'action */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        onClick={cancelRequisition}
                    >
                        Annuler la réquisition
                    </button>
                    <div className="flex gap-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            onClick={rejectRequisition}
                        >
                            Rejeter
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={approveRequisition}
                        >
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}