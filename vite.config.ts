import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        checkout: resolve(__dirname, "checkout.html"),
        productPage: resolve(__dirname, "product-page.html"),
        productDetails: resolve(__dirname, "product-details-page.html"),
        orderConfirmation: resolve(__dirname, "order-confirmation-page.html"),
      },
    },
  },
});