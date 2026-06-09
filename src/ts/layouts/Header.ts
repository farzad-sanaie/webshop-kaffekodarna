import { initCart } from "../cart/cart";
import { initHamburgerMenu } from "../components/HamburgerMenu";
import { initProductDetails } from "../pages/productDetails";
import { initProductPage } from "../pages/productPage";

export const initHeader = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("/header.html");

      if (!res.ok) {
        throw new Error(`Header not found: ${res.status}`);
      }

      const html = await res.text();

      const header = document.getElementById("header");
      if (header) {
        header.innerHTML = html;

        initCart();
        initHamburgerMenu();

        if (document.getElementById("product-page")) {
          initProductPage();
        }

        if (document.getElementById("details-page")) {
          initProductDetails();
        }
      }
    } catch (err) {
      console.error("Header load failed:", err);
    }
  });
};