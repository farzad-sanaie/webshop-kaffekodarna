import "../scss/style.scss";
import { loadProducts, renderProducts } from "./components/ProductCard";
import type { Product } from "./models/Product";

// hamburger slay

const btnHamburger = document.querySelector<HTMLElement>("#btnHamburger");
const body = document.body;
const header = document.querySelector<HTMLElement>(".header");
const fadeElems = document.querySelectorAll<HTMLElement>(".has-fade");

// safety check
if (!btnHamburger || !header) {
  throw new Error("Required DOM elements not found");
}

btnHamburger.addEventListener("click", (e) => {
  e.preventDefault(); // prevent page jump
  console.log("click hamburger");

  const isOpen = header.classList.contains("open");

  if (isOpen) {
    // close hamburger menu
    body.classList.remove("noscroll");
    header.classList.remove("open");

    fadeElems.forEach((element) => {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
  } else {
    // open hamburger menu
    body.classList.add("noscroll");
    header.classList.add("open");

    fadeElems.forEach((element) => {
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
  }
});

// initialize products
const init = async () => {
  const products = await loadProducts();

  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  const newParam = params.get("isNew");

  const isNew = newParam === "true";

  let filteredProducts: Product[] = products;

  if(categoryParam !== null) {
    filteredProducts = products.filter((p: Product) => p.category === categoryParam);
  } else {
    filteredProducts = products;
  }

  if(isNew) {
    filteredProducts = products.filter((p: Product) => p.isNew === isNew);
  }

  const sortedProducts = filteredProducts.sort((a: Product, b: Product) => {
    if(a.isNew && !b.isNew) {
      return -1; // a is before b
    }

    if(!a.isNew && b.isNew) {
      return 1; // a is after b
    }

    return 0;
  });

  renderProducts(sortedProducts);
};

init();
