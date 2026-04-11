import { create } from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {CartItemsType, CartItemType} from "@/types";

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
}

export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStoreStateType & CartStoreActionType>()(
  persist(
    set => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) => set(state => {
        const existingIndex = state.cart.findIndex(item =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
        )
        if (existingIndex !== -1) {
          const updatedCart = [...state.cart]
          updatedCart[existingIndex].quantity += product.quantity || 1
          return {cart: updatedCart}
        } else {
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor
              },
            ]
          }
        }
      }),
      removeFromCart: (product) => set(state => ({
        cart: state.cart.filter(p => !(
          p.id === product.id &&
          p.selectedSize === product.selectedSize &&
          p.selectedColor === product.selectedColor
        )),
      })),
      clearCart: () => set(() => ({cart: []})),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true
        }
      }
    }
  ),
)


export default useCartStore
