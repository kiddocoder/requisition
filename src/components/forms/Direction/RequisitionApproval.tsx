import { useState, useRef } from "react";
import { Check, Printer, Save, Mail, FileText, Download, CheckCircle } from "lucide-react";

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
    status: "pending" | "approved" | "rejected" | "finalized";
    items: Item[];
    totalAmount: number;
    comments: Comment[];
    approvedBy?: string;
    approvalDate?: string;
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
    status: "approved", // Déjà approuvé par la comptabilité
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
        {
            id: "c2",
            author: "Service Comptabilité",
            text: "Réquisition approuvée. Budget disponible.",
            date: "2023-05-17",
        },
    ],
};

export default function RequisitionApproval() {
    const [requisition, setRequisition] = useState<Requisition>(sampleRequisition);
    const [comment, setComment] = useState("");
    const [emailTo, setEmailTo] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);

    // Référence pour simuler l'impression
    const printRef = useRef<HTMLDivElement>(null);

    // Fonction pour finaliser la réquisition
    const finalizeRequisition = () => {
        setRequisition((prev) => ({
            ...prev,
            status: "finalized",
            approvedBy: "Direction Générale",
            approvalDate: new Date().toISOString().split("T")[0],
            comments: [
                ...prev.comments,
                {
                    id: `c${prev.comments.length + 1}`,
                    author: "Direction Générale",
                    text: comment || "Réquisition finalisée et approuvée.",
                    date: new Date().toISOString().split("T")[0],
                },
            ],
        }));
        setComment("");
    };

    // Fonction pour simuler l'impression en PDF
    const handlePrint = () => {
        window.print();
    };

    // Fonction pour simuler la sauvegarde
    const handleSave = () => {
        setTimeout(() => {
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
        }, 1000);
    };

    // Fonction pour simuler l'envoi par email
    const handleSendEmail = () => {
        if (!emailTo) return;

        setTimeout(() => {
            setEmailSent(true);
            setTimeout(() => {
                setEmailSent(false);
                setEmailTo("");
            }, 3000);
        }, 1000);
    };

    // Fonction pour générer un PDF (simulation)
    const handleGeneratePDF = () => {
        const link = document.createElement("a");
        link.href = "#";
        link.setAttribute("download", `Requisition-${requisition.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container  py-6">
            <div className="bg-white rounded-lg shadow-lg p-2">
                {/* En-tête */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-semibold">Approbation Finale - Direction</h1>
                        <p className="text-sm text-gray-600">Finaliser et approuver les réquisitions</p>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${requisition.status === "finalized"
                            ? "bg-green-100 text-green-800"
                            : requisition.status === "approved"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {requisition.status === "finalized"
                            ? "Finalisée"
                            : requisition.status === "approved"
                                ? "En attente d'approbation finale"
                                : "Rejetée"}
                    </span>
                </div>

                {/* Détails de la réquisition */}
                <div ref={printRef} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50">
                        <div>
                            <p className="text-sm text-blue-700 font-medium">Numéro de réquisition</p>
                            <p className="text-sm">{requisition.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700  font-medium">Demandeur</p>
                            <p className="text-sm">{requisition.requestedBy}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700  font-medium">Département</p>
                            <p className="text-sm">{requisition.department}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700  font-medium">Date de demande</p>
                            <p className="text-sm">{requisition.date}</p>
                        </div>
                        {requisition.approvedBy && (
                            <>
                                <div>
                                    <p className="text-sm text-blue-700  font-medium">Approuvé par</p>
                                    <p className="text-sm">{requisition.approvedBy}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-700  font-medium">Date d'approbation</p>
                                    <p className="text-sm">{requisition.approvalDate}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Liste des articles */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Articles demandés</h3>
                        <div className="overflow-x-auto border border-gray-200 p-2 rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-300 text-blue-700 ">
                                        <th className="px-4 py-2 text-left">Description</th>
                                        <th className="px-4 py-2 text-right">Qté</th>
                                        <th className="px-4 py-2 text-right">P.U</th>
                                        <th className="px-4 py-2 text-right">P.T</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requisition.items.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200 odd:bg-gray-100">
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2 text-right">{item.quantity}</td>
                                            <td className="px-4 py-2 text-right">{item.unitPrice.toFixed(2)} €</td>
                                            <td className="px-4 py-2 text-right">{item.totalPrice.toFixed(2)} €</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3} className="px-4 py-2 text-right font-bold">
                                            Montant Total
                                        </td>
                                        <td className="px-4 py-2 text-right font-bold">{requisition.totalAmount.toFixed(2)} €</td>
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

                    {/* Ajouter un commentaire */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Ajouter un commentaire</h3>
                        <textarea
                            placeholder="Entrez votre commentaire ici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border border-gray-100 rounded-lg min-h-[100px]"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Imprimer en PDF */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Printer className="h-5 w-5 text-blue-500" />
                            <h3 className="text-base font-medium">Imprimer la réquisition</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Générez un document PDF de cette réquisition pour l'impression ou l'archivage.
                        </p>
                        <button
                            onClick={handlePrint}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Printer className="inline-block mr-2 h-4 w-4" />
                            Imprimer
                        </button>
                    </div>

                    {/* Télécharger en PDF */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Download className="h-5 w-5 text-blue-500" />
                            <h3 className="text-base font-medium">Télécharger en PDF</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Téléchargez cette réquisition au format PDF sur votre appareil.
                        </p>
                        <button
                            onClick={handleGeneratePDF}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <FileText className="inline-block mr-2 h-4 w-4" />
                            Générer PDF
                        </button>
                    </div>

                    {/* Enregistrer */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Save className="h-5 w-5 text-blue-500" />
                            <h3 className="text-base font-medium">Enregistrer la réquisition</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Enregistrez cette réquisition dans le système pour référence future.
                        </p>
                        <button
                            onClick={handleSave}
                            disabled={savedSuccess}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {savedSuccess ? (
                                <>
                                    <CheckCircle className="inline-block mr-2 h-4 w-4" />
                                    Enregistré
                                </>
                            ) : (
                                <>
                                    <Save className="inline-block mr-2 h-4 w-4" />
                                    Enregistrer
                                </>
                            )}
                        </button>
                    </div>

                    {/* Envoyer par email */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="h-5 w-5 text-blue-500" />
                            <h3 className="text-base font-medium">Envoyer par email</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Envoyez cette réquisition par email à un destinataire.
                        </p>
                        <div className="space-y-2">
                            <input
                                type="email"
                                placeholder="exemple@domaine.com"
                                value={emailTo}
                                onChange={(e) => setEmailTo(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                            <button
                                onClick={handleSendEmail}
                                disabled={!emailTo || emailSent}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {emailSent ? (
                                    <>
                                        <CheckCircle className="inline-block mr-2 h-4 w-4" />
                                        Envoyé
                                    </>
                                ) : (
                                    <>
                                        <Mail className="inline-block mr-2 h-4 w-4" />
                                        Envoyer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bouton de finalisation */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={finalizeRequisition}
                        disabled={requisition.status === "finalized"}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Check className="inline-block mr-2 h-4 w-4" />
                        {requisition.status === "finalized" ? "Réquisition finalisée" : "Finaliser la réquisition"}
                    </button>
                </div>
            </div>
        </div>
    );
}