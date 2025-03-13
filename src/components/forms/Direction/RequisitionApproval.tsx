"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Printer, Save, Mail, FileText, Download, CheckCircle } from "lucide-react"

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
    status: "pending" | "approved" | "rejected" | "finalized"
    items: Item[]
    totalAmount: number
    comments: Comment[]
    approvedBy?: string
    approvalDate?: string
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
}

export default function RequisitionApproval() {
    const [requisition, setRequisition] = useState<Requisition>(sampleRequisition)
    const [comment, setComment] = useState("")
    const [emailTo, setEmailTo] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [savedSuccess, setSavedSuccess] = useState(false)

    // Référence pour simuler l'impression
    const printRef = useRef<HTMLDivElement>(null)

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
        }))
        setComment("")
    }

    // Fonction pour simuler l'impression en PDF
    const handlePrint = () => {
        // Dans une application réelle, vous utiliseriez une bibliothèque comme jsPDF ou react-to-pdf
        window.print()
    }

    // Fonction pour simuler la sauvegarde
    const handleSave = () => {
        // Simuler une sauvegarde
        setTimeout(() => {
            setSavedSuccess(true)
            setTimeout(() => setSavedSuccess(false), 3000)
        }, 1000)
    }

    // Fonction pour simuler l'envoi par email
    const handleSendEmail = () => {
        if (!emailTo) return

        // Simuler l'envoi d'email
        setTimeout(() => {
            setEmailSent(true)
            setTimeout(() => {
                setEmailSent(false)
                setEmailTo("")
            }, 3000)
        }, 1000)
    }

    // Fonction pour générer un PDF (simulation)
    const handleGeneratePDF = () => {
        // Dans une application réelle, vous utiliseriez une bibliothèque comme jsPDF
        const link = document.createElement("a")
        link.href = "#"
        link.setAttribute("download", `Requisition-${requisition.id}.pdf`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="container mx-auto py-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Approbation Finale - Direction</CardTitle>
                            <CardDescription>Finaliser et approuver les réquisitions</CardDescription>
                        </div>
                        <Badge
                            variant={
                                requisition.status === "finalized"
                                    ? "default"
                                    : requisition.status === "approved"
                                        ? "outline"
                                        : "destructive"
                            }
                        >
                            {requisition.status === "finalized"
                                ? "Finalisée"
                                : requisition.status === "approved"
                                    ? "En attente d'approbation finale"
                                    : "Rejetée"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Tabs defaultValue="details">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Détails de la réquisition</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-6">
                            {/* Informations de la réquisition */}
                            <div ref={printRef}>
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
                                    {requisition.approvedBy && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium">Approuvé par</p>
                                                <p className="text-sm">{requisition.approvedBy}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Date d'approbation</p>
                                                <p className="text-sm">{requisition.approvalDate}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Liste des articles */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-2">Articles demandés</h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead className="text-right">Quantité</TableHead>
                                                <TableHead className="text-right">Prix unitaire</TableHead>
                                                <TableHead className="text-right">Prix total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {requisition.items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">{item.unitPrice.toFixed(2)} €</TableCell>
                                                    <TableCell className="text-right">{item.totalPrice.toFixed(2)} €</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-right font-bold">
                                                    Montant Total
                                                </TableCell>
                                                <TableCell className="text-right font-bold">{requisition.totalAmount.toFixed(2)} €</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Commentaires */}
                                <div className="mt-6">
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
                        </TabsContent>

                        <TabsContent value="actions" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Imprimer en PDF */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center">
                                            <Printer className="mr-2 h-5 w-5" />
                                            Imprimer la réquisition
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Générez un document PDF de cette réquisition pour l'impression ou l'archivage.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handlePrint} className="w-full">
                                            <Printer className="mr-2 h-4 w-4" />
                                            Imprimer
                                        </Button>
                                    </CardFooter>
                                </Card>

                                {/* Télécharger en PDF */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center">
                                            <Download className="mr-2 h-5 w-5" />
                                            Télécharger en PDF
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Téléchargez cette réquisition au format PDF sur votre appareil.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleGeneratePDF} className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Générer PDF
                                        </Button>
                                    </CardFooter>
                                </Card>

                                {/* Enregistrer */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center">
                                            <Save className="mr-2 h-5 w-5" />
                                            Enregistrer la réquisition
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Enregistrez cette réquisition dans le système pour référence future.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSave} className="w-full" disabled={savedSuccess}>
                                            {savedSuccess ? (
                                                <>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Enregistré
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Enregistrer
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>

                                {/* Envoyer par email */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center">
                                            <Mail className="mr-2 h-5 w-5" />
                                            Envoyer par email
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Adresse email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="exemple@domaine.com"
                                                value={emailTo}
                                                onChange={(e) => setEmailTo(e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSendEmail} className="w-full" disabled={!emailTo || emailSent}>
                                            {emailSent ? (
                                                <>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Envoyé
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Envoyer
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button disabled={requisition.status === "finalized"}>
                                <Check className="mr-2 h-4 w-4" />
                                {requisition.status === "finalized" ? "Réquisition finalisée" : "Finaliser la réquisition"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmer la finalisation</DialogTitle>
                                <DialogDescription>
                                    Êtes-vous sûr de vouloir finaliser cette réquisition ? Cette action est définitive.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => { }}>
                                    Annuler
                                </Button>
                                <Button onClick={finalizeRequisition}>Confirmer</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    )
}

