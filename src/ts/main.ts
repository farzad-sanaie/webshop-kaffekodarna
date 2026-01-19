import "../scss/style.scss";
import { initHamburgerMenu } from "./components/HamburgerMenu";
import { initProductDetails } from "./pages/productDetails";
import { initProductPage } from "./pages/productPage";

// initialize hamburger menu
initHamburgerMenu();

// initialize products
if (document.getElementById("product-page")) {
  initProductPage();
}

// initialize product details
if (document.getElementById("details-page")) {
  initProductDetails();
}
