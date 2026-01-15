import "../scss/style.scss";
import { loadProducts, renderProducts } from "./components/ProductCard";
import type { Product } from "./models/Product";
import { initHamburgerMenu } from "./components/HamburgerMenu";

// initialize hamburger menu
initHamburgerMenu();

// initialize products
const init = async () => {
  const products = await loadProducts();

  // create new URLSearchParams objects
  const params = new URLSearchParams(window.location.search);

  // get correct parameters from url
  const categoryParam = params.get("category");
  const newParam = params.get("isNew");

  const isNew = newParam === "true";

  // get title of page
  const pageTitle = document.getElementById(
    "product-page-title"
  ) as HTMLHeadingElement;

  let filteredProducts: Product[] = products;

  // filter products based on parameter
  if (categoryParam !== null) {
    filteredProducts = products.filter(
      (p: Product) => p.category === categoryParam
    );

    if (pageTitle) {
      pageTitle.textContent =
        categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    }
  } else {
    filteredProducts = products;
  }

  if (isNew) {
    filteredProducts = products.filter((p: Product) => p.isNew === isNew);
    if (pageTitle) {
      pageTitle.textContent = "New arrivals";
    }
  }

  // sort products so new products are shown first
  const sortedProducts = filteredProducts.sort((a: Product, b: Product) => {
    if (a.isNew && !b.isNew) {
      return -1; // a is before b
    }

    if (!a.isNew && b.isNew) {
      return 1; // a is after b
    }

    return 0;
  });

  renderProducts(sortedProducts);
};

init();
