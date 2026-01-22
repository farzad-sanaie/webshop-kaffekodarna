import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/Product";
import { decrease, increase } from "../services/cartService";

export let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

// initialize cart
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

export const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: Product) => {
  let found = false;

  // loops through cart and checks if product id matches cart id
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      // add one to quantity
      cart[i].quantity++;
      found = true;
    }
  }

  // if product was not found, add product to cart with quantity: 1
  if (!found) {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartBadge();
  renderMiniCart();
};

// function to show number of items in cart
export const updateCartBadge = () => {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }

  badge.innerText = total.toString();
  // if total is bigger than 0, set display to block, otherwise none
  badge.style.display = total > 0 ? "block" : "none";
};

export const renderMiniCart = () => {
  const list = document.getElementById("miniCartList");
  const sub = document.getElementById("miniCartSubtotal");
  const total = document.getElementById("miniCartTotal");

  if (!list || !sub || !total) return;

  list.innerHTML = "";

  let sum = 0;

  // loops through cart and creates html for mini cart
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    sum += item.price * item.quantity;

    const li = document.createElement("li");

    const name = document.createElement("span");
    name.innerText = `${item.name} - ${item.price} SEK`;

    const minus = document.createElement("button");
    minus.innerText = "-";
    // calls decrease function which applies onclick on minus button
    decrease(minus, item, i, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const qty = document.createElement("span");
    qty.innerText = item.quantity.toString();

    const plus = document.createElement("button");
    plus.innerText = "+";
    // calls increase function which applies onclick on plus button
    increase(plus, item, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const remove = document.createElement("button");
    remove.innerText = "🗑";
    // adds onclick to remove-button, removes item from cart
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
