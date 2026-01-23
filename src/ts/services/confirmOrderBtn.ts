import { cart, saveCart } from "../cart/cart";

export function initConfirmOrderBtn() {
  const confirmButton = document.getElementById(
    "confirm-order-btn",
  ) as HTMLButtonElement | null;

  if (!confirmButton) return;

  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    // stop if cart is empty
    if (cart.length === 0) {
      return;
    }

    const shippingErrors = document.querySelectorAll(".input--error");
    if (shippingErrors.length > 0) {
      return;
    }

    const paymentSection = document.getElementById("payment-method");
    if (paymentSection?.classList.contains("payment--error")) {
      return;
    } // PLS WORKKKKKKK

    // clear cart
    cart.length = 0;
    saveCart();

    // redirect
    window.location.href = "order-confirmation-page.html";
  });
}
