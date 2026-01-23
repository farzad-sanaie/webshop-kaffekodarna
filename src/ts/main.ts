import "../scss/style.scss";

import { initHamburgerMenu } from "./components/HamburgerMenu";
import { initShippingForm } from "./components/ShippingForm";

import { initProductPage } from "./pages/productPage";
import { initProductDetails } from "./pages/productDetails";

import { initCart } from "./cart/cart";
import { renderCheckoutPage } from "./pages/checkoutPage";

import { initPaymentError } from "./services/paymentError";

if (document.getElementById("checkout-cart")) {
  renderCheckoutPage();
}

// init cart + mini cart
initCart();

// menu
initHamburgerMenu();

// product page
if (document.getElementById("product-page")) {
  initProductPage();
}

// product details page
if (document.getElementById("details-page")) {
  initProductDetails();
}

// checkout error handling
document.addEventListener("DOMContentLoaded", () => {
  initShippingForm();
  initPaymentError();
});
