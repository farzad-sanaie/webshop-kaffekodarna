import "../scss/style.scss";

import { renderCheckoutPage } from "./pages/checkoutPage";
import { initHeader } from "./layouts/Header";
import { initFooter } from "./layouts/Footer";
import { initShippingForm } from "./components/ShippingForm";

// Get Header
initHeader();

// Get Footer
initFooter();

// shipping form
document.addEventListener("DOMContentLoaded", () => {
  initShippingForm();
});

if (document.getElementById("checkout-cart")) {
  renderCheckoutPage();
}