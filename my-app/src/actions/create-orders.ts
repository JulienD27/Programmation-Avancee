// src/actions/create-orders.ts

import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma"; // Assurez-vous d'avoir une instance prisma configurée

export default async function createOrderAndClearCart(): Promise<void> {
    // Obtenez la session utilisateur à partir de la requête en cours
    const session = await getSession(); // Utilisez cette fonction avec next-auth ou une méthode similaire pour obtenir la session utilisateur

    if (!session?.user) {
        throw new Error("User session not found");
    }

    try {
        // Créez une nouvelle commande en base de données avec les données appropriées
        const newOrder = await prisma.order.create({
            data: {
                // Insérez les détails de la commande, par exemple, le total, les lignes de commande, etc.
                // Assurez-vous de récupérer les détails de la commande à partir du panier du client
                // Remplacez ces valeurs factices par celles appropriées
                total: 100, // Remplacez par le montant total du panier
                lines: {
                    create: [
                        {
                            // Créez les lignes de commande pour cette commande
                            // Insérez les détails de la ligne de commande, par exemple, le produit, la quantité, le sous-total, etc.
                            productId: 1, // Remplacez par l'ID du produit
                            qty: 2, // Remplacez par la quantité commandée
                            subtotal: 50, // Remplacez par le sous-total de cette ligne
                        },
                        // ... ajoutez d'autres lignes de commande si nécessaire
                    ],
                },
            },
        });

        // Videz ensuite le panier du client en supprimant toutes les lignes de commande associées à l'utilisateur
        await prisma.orderLine.deleteMany({
            where: {
                orderId: null, // Ajoutez d'autres conditions si nécessaire pour supprimer les lignes spécifiques du client
                // Par exemple, où orderId est null et userId correspond à l'ID de l'utilisateur actuel
                // Replacez les valeurs en fonction de votre schéma de base de données
            },
        });

        // Vous pouvez également effectuer d'autres actions ici, par exemple, envoyer un email de confirmation, etc.

    } catch (error) {
        console.error("Error creating order and clearing cart:", error);
        throw new Error("Failed to create order and clear cart");
    }
}
