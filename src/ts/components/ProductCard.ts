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
    const card = document.createElement("article");
    const cardDiv = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h3");
    const cardPrice = document.createElement("p");

    const btnContainer = document.createElement("div");
    const btn = document.createElement("button");
    const btnImg = document.createElement("img");
    const favIcon = document.createElement("img");

    // add classes to elements
    card.className = "card flex flex-ai-c";
    cardDiv.className = "detail-container flex flex-jc-sb"
    cardImg.className = "card__img";
    cardTitle.className = "card__title";
    cardPrice.className = "card__price";

    btnContainer.className = "btn-container flex";
    btn.className = "card__btn cart-btn cart-btn--primary";
    favIcon.className = "favorite";

    // add content to elements
    cardImg.src = product.image;
    cardImg.alt = product.name;

    // if the product is a licorice, don't write variant in title
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

    card.addEventListener("click", () => {
      window.location.href = "/product-details-page.html";
    });

    // append elements
    btn.appendChild(btnImg);
    btnContainer.append(btn, favIcon);

    cardDiv.append(cardTitle, cardPrice, btnContainer);
    card.append(cardImg, cardDiv);
    
    let newSpan;

    if(product.isNew === true) {
      newSpan = document.createElement("span");
      newSpan.className = "new";
      newSpan.textContent = "New";
      card.append(newSpan);
    }

    grid.append(card);
  });
};

export const initProductCards = async () => {
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
