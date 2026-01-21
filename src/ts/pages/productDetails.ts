import { loadProducts } from "../components/ProductCard";
import type { Product } from "../models/Product";
import { setupFavoriteIcon } from "../services/favorites";
import { addToCart } from "../cart";


export const initProductDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  if (!productId) {
    console.log("Error: No productId in URL");
    return;
  }

  const products = await loadProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.log("Error: Product not found");
    return;
  }

  // back button will take you back to previous page
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
  }

  const favIcon = document.getElementById("fav-icon") as HTMLImageElement;
  if (favIcon) {
    // sets an initial image to icon
    setupFavoriteIcon(favIcon, productId);
  }

  renderProductDetails(product);
  const addBtn = document.getElementById("addToCartBtn");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    addToCart(product);
  });
}

};

const renderProductDetails = (product: Product): Product => {
  const title = document.getElementById("product-title") as HTMLHeadingElement;
  const img = document.getElementById("product-img") as HTMLImageElement;
  const text = document.getElementById(
    "product-description"
  ) as HTMLParagraphElement;

  // if product is licorice, only show name, otherwise also show variant
  if (product.category !== "licorice") {
    title.textContent = product.name + " - " + product.variant;
  } else {
    title.textContent = product.name;
  }

  img.src = product.image;
  img.alt = product.name + " - " + product.variant;

  text.textContent = product.description;

  return product;
};
