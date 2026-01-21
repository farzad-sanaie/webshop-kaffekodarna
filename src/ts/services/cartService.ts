import { saveCart } from "../cart/cart";
import type { CartItem } from "../models/CartItem";

export const decrease = (
  btn: HTMLButtonElement,
  cart: CartItem[],
  item: CartItem,
  index: number,
  afterClick: () => void
) => {
  btn.onclick = () => {
    item.quantity--;
    if (item.quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    afterClick();
  };
};

export const increase = (
  btn: HTMLButtonElement,
  item: CartItem,
  afterClick: () => void
) => {
  btn.onclick = () => {
    item.quantity++;
    saveCart();
    afterClick();
  };
};
