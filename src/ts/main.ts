import "../scss/style.scss";

import { renderCheckoutPage } from "./pages/checkoutPage";
import { initHeader } from "./layouts/Header";
import { initFooter } from "./layouts/Footer";

if (document.getElementById("checkout-cart")) {
  renderCheckoutPage();
}

// Get Header
initHeader();

// Get Footer
initFooter();