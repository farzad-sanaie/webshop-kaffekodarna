import "../scss/style.scss";
import { initHamburgerMenu } from "./components/HamburgerMenu";
import { initProductCards } from "./components/ProductCard";
import { initShippingForm } from "./components/ShippingForm";

// initialize hamburger menu
initHamburgerMenu();

// initialize products
initProductCards();

// initialize shipping form
document.addEventListener("DOMContentLoaded", () => {
  initShippingForm();
});
