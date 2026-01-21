import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/Product";
import { decrease, increase } from "../services/cartService";

let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

export const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: Product) => {
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      cart[i].quantity++;
      found = true;
    }
  }

  if (!found) {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartBadge();
  renderMiniCart();
};

export const updateCartBadge = () => {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }

  badge.innerText = total.toString();
  badge.style.display = total > 0 ? "block" : "none";
};

export const renderMiniCart = () => {
  const list = document.getElementById("miniCartList");
  const sub = document.getElementById("miniCartSubtotal");
  const total = document.getElementById("miniCartTotal");

  if (!list || !sub || !total) return;

  list.innerHTML = "";

  let sum = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    sum += item.price * item.quantity;

    const li = document.createElement("li");

    const name = document.createElement("span");
    name.innerText = `${item.name} - ${item.price} SEK`;

    const minus = document.createElement("button");
    minus.innerText = "-";

    decrease(minus, cart, item, i, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const qty = document.createElement("span");
    qty.innerText = item.quantity.toString();

    const plus = document.createElement("button");
    plus.innerText = "+";
    increase(plus, item, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const remove = document.createElement("button");
    remove.innerText = "🗑";
    remove.onclick = () => {
      cart.splice(i, 1);
      saveCart();
      updateCartBadge();
      renderMiniCart();
    };

    li.appendChild(name);
    li.appendChild(minus);
    li.appendChild(qty);
    li.appendChild(plus);
    li.appendChild(remove);

    list.appendChild(li);
  }

  sub.innerText = sum.toString();
  total.innerText = sum.toString();
};

export const initCart = () => {
  const icon = document.getElementById("cartIcon");
  const miniCart = document.getElementById("miniCart");

  if (icon && miniCart) {
    icon.onclick = () => {
      miniCart.style.display =
        miniCart.style.display === "none" ? "block" : "none";
      renderMiniCart();
    };
  }

  updateCartBadge();
};