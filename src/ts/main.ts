import "../scss/style.scss";

import { renderCheckoutPage } from "./pages/checkoutPage";
import { initHeader } from "./layouts/Header";
import { initFooter } from "./layouts/Footer";
import { initShippingForm } from "./components/ShippingForm";

import { initPaymentError } from "./services/paymentError";

if (document.getElementById("checkout-cart")) {
  renderCheckoutPage();
}

// Get Header
initHeader();

// Get Footer
initFooter();

if (document.getElementById("checkout-cart")) {
  renderCheckoutPage();
}

// checkout error handling
document.addEventListener("DOMContentLoaded", () => {
  initShippingForm();
  initPaymentError();
});
