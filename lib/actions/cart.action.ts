'use server'
import { CartItem } from "@/types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addItemToCart(data: CartItem) {
  return {
    success: false,
    message: 'Item added to cart'
  }
}