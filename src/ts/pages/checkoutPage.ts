import { loadCart } from "../cart/cart";
import { decrease, increase } from "../services/cartService";

const updateSummary = (cart: any[]) => {
  let sum = 0;

  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price * cart[i].quantity;
  }

  const sub = document.getElementById("summary-subtotal");
  const total = document.getElementById("summary-total");

  if (sub) sub.innerText = sum.toString();
  if (total) total.innerText = sum.toString();
};

const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const renderCheckoutPage = () => {
  const cartSection = document.getElementById("checkout-cart");
  if (!cartSection) return;

  //ta bort gamla rader men behåll headre
  const oldItems = cartSection.getElementsByClassName("cart__item");
  while (oldItems.length > 0) {
    oldItems[0].remove();
  }

  const cart = loadCart();
  updateSummary(cart);

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const row = document.createElement("div");
    row.className = "cart__item";

    const product = document.createElement("div");
    product.className = "cart__product";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "cart__image";

    const name = document.createElement("span");
    name.innerText = item.name;

    product.appendChild(img);
    product.appendChild(name);

    const price = document.createElement("span");
    price.innerText = item.price + " SEK";

    // quantity box
    const qtyBox = document.createElement("div");
    qtyBox.className = "cart__quantity";

    const minus = document.createElement("button");
    minus.innerText = "-";

    // fungerar inte än
    decrease(minus, cart, item, i, () => {
      renderCheckoutPage();
    });

    const qty = document.createElement("span");
    qty.innerText = item.quantity.toString();

    const plus = document.createElement("button");
    plus.innerText = "+";

    // fungerar inte heller än
    increase(plus, item, () => {
      renderCheckoutPage();
    });

    qtyBox.appendChild(minus);
    qtyBox.appendChild(qty);
    qtyBox.appendChild(plus);

    const subtotal = document.createElement("span");
    subtotal.innerText = item.price * item.quantity + " SEK";

    const remove = document.createElement("button");
    remove.className = "cart__remove";
    remove.innerText = "🗑";
    remove.onclick = () => {
      cart.splice(i, 1);
      saveCart(cart);
      renderCheckoutPage();
    };

    row.appendChild(product);
    row.appendChild(price);
    row.appendChild(qtyBox);
    row.appendChild(subtotal);
    row.appendChild(remove);

    cartSection.appendChild(row);
  }
};

const confirmBtn = document.getElementById(
  "confirmOrderBtn",
) as HTMLButtonElement;

if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    //kolla varukorg
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "country",
      "city",
      "zip",
      "email",
      "phone",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      const input = document.getElementById(
        requiredFields[i],
      ) as HTMLInputElement;

      if (!input || input.value.trim() === "") {
        alert("Please fill in all shipping details.");
        return;
      }
    }

    localStorage.removeItem("cart");
    window.location.href = "done.html";
  });
}
