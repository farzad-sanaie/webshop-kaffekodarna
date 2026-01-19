import { loadProducts } from "../components/ProductCard";
import type { Product } from "../models/Product";

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

  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
  }

  renderProductDetails(product);
};

const renderProductDetails = (product: Product): Product => {
  const title = document.getElementById("product-title") as HTMLHeadingElement;
  const img = document.getElementById("product-img") as HTMLImageElement;
  const text = document.getElementById(
    "product-description"
  ) as HTMLParagraphElement;

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
