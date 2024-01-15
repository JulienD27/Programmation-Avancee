"use server";

import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import {User} from "@supabase/auth-helpers-nextjs";


export async function createOrder(cart: CartData, user: User | null): Promise<{ error: string | null, success: boolean }> {
  if (!user) {
    return { error: "Utilisateur non connecté. Connectez-vous pour passer commande.", success: false };
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: computeCartTotal(cart.lines),
        lines: {
          create: cart.lines.map(line => ({
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line)
          }))
        }
      }
    });

    return { error: null, success: true };
  } catch (error) {
    return { error: "Une erreur est survenue lors de la création de la commande.", success: false };
  }
}
