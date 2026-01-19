import { loadProducts } from "../components/ProductCard";
import type { Product } from "../models/Product";

const initProductDetails = async () => {
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

  renderProductDetails(product);
};

const renderProductDetails = (product: Product): Product => {
  return product;
};
