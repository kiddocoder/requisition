"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@mui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, X, Trash2, AlertCircle } from "lucide-react"

// Types pour les données
interface Item {
    id: string
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

interface Requisition {
    id: string
    requestedBy: string
    department: string
    date: string
    status: "pending" | "approved" | "rejected"
    items: Item[]
    totalAmount: number
    comments: Comment[]
}

interface Comment {
    id: string
    author: string
    text: string
    date: string
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
}

export default function RequisitionReview() {
    const [requisition, setRequisition] = useState<Requisition>(sampleRequisition)
    const [comment, setComment] = useState("")

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
        }))
        setComment("")
    }

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
        }))
        setComment("")
    }

    // Fonction pour supprimer un article
    const removeItem = (itemId: string) => {
        const updatedItems = requisition.items.filter((item) => item.id !== itemId)
        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)

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
        }))
    }

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
        }))
    }

    return (
        <div className="container mx-auto py-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Révision de Réquisition - Service Comptabilité</CardTitle>
                            <CardDescription>Examiner et approuver les demandes de réquisition</CardDescription>
                        </div>
                        <Badge
                            variant={
                                requisition.status === "approved"
                                    ? "default"
                                    : requisition.status === "rejected"
                                        ? "destructive"
                                        : "outline"
                            }
                        >
                            {requisition.status === "approved"
                                ? "Approuvée"
                                : requisition.status === "rejected"
                                    ? "Rejetée"
                                    : "En attente"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Informations de la réquisition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
                        <div>
                            <p className="text-sm font-medium">Numéro de réquisition</p>
                            <p className="text-sm">{requisition.id}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Demandeur</p>
                            <p className="text-sm">{requisition.requestedBy}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Département</p>
                            <p className="text-sm">{requisition.department}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Date de demande</p>
                            <p className="text-sm">{requisition.date}</p>
                        </div>
                    </div>

                    {/* Liste des articles */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Articles demandés</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Quantité</TableHead>
                                    <TableHead className="text-right">Prix unitaire</TableHead>
                                    <TableHead className="text-right">Prix total</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requisition.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">{item.unitPrice.toFixed(2)} €</TableCell>
                                        <TableCell className="text-right">{item.totalPrice.toFixed(2)} €</TableCell>
                                        <TableCell className="text-right">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Supprimer cet article?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Cette action ne peut pas être annulée. Cet article sera retiré de la réquisition.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => removeItem(item.id)}>Supprimer</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} className="text-right font-bold">
                                        Montant Total
                                    </TableCell>
                                    <TableCell className="text-right font-bold">{requisition.totalAmount.toFixed(2)} €</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Commentaires */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Historique des commentaires</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
                            {requisition.comments.map((comment) => (
                                <div key={comment.id} className="p-2 bg-muted/20 rounded">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{comment.author}</span>
                                        <span className="text-muted-foreground">{comment.date}</span>
                                    </div>
                                    <p className="text-sm mt-1">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ajouter un commentaire */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Ajouter un commentaire</h3>
                        <Textarea
                            placeholder="Entrez votre commentaire ici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Annuler la réquisition
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Annuler cette réquisition?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. La réquisition sera rejetée définitivement.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Retour</AlertDialogCancel>
                                    <AlertDialogAction onClick={cancelRequisition}>Confirmer l'annulation</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={rejectRequisition}>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Rejeter
                        </Button>
                        <Button onClick={approveRequisition}>
                            <Check className="mr-2 h-4 w-4" />
                            Approuver
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

