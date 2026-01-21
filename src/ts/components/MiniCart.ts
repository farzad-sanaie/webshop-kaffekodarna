import { renderMiniCart } from "../cart/cart";

const cartIcon = document.querySelector(
  'img[alt="Shopping Cart"]'
) as HTMLElement;

const miniCart = document.getElementById("mini-cart") as HTMLElement;

cartIcon.addEventListener("click", () => {
  miniCart.classList.toggle("hidden");
  renderMiniCart();
});
