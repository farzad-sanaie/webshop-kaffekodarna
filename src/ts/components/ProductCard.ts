import type { Product } from "../models/Product";

const grid = document.getElementById("item-grid") as HTMLElement;

// load in products
export const loadProducts = async (): Promise<Product[]> => {
  const response = await fetch("/data/products.json");
  const data = await response.json();
  console.log(response.ok, response.status);

  return data.products;
};

export const renderProducts = (products: Product[]) => {
  // empty products
  grid.innerHTML = "";

  products.forEach((product: Product) => {
    // create elements
    const card = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h3");
    const cardPrice = document.createElement("p");

    const btnContainer = document.createElement("div");
    const btn = document.createElement("button");
    const btnImg = document.createElement("img");
    const favIcon = document.createElement("img");

    // add classes to elements
    card.className = "card flex flex-jc-c flex-ai-c";
    cardImg.className = "card__img";
    cardTitle.className = "card__title";
    cardPrice.className = "card__price";

    btnContainer.className = "btn-container flex";
    btn.className = "card__btn";
    btnImg.className = "card__btn-img";
    favIcon.className = "card__favorite";

    // add content to elements
    cardImg.src = product.image;
    cardImg.alt = product.name;

    if (product.category !== "licorice") {
      cardTitle.textContent = product.name + " - " + product.variant;
    } else {
      cardTitle.textContent = product.name;
    }

    cardPrice.textContent = product.price + " kr";

    btn.textContent = "Add to cart";
    btnImg.src = "/img/icon_ShoppingCartSimple.svg";
    btnImg.alt = "Shopping cart";

    favIcon.src = "/img/icon_wishlist_deafult.svg";
    favIcon.alt = "Favorite icon";

    // append elements
    btn.appendChild(btnImg);
    btnContainer.append(btn, favIcon);

    card.append(cardImg, cardTitle, cardPrice, btnContainer);

    grid.append(card);
  });
};
