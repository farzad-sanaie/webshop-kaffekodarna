const autoFillData: Record<string, string> = {
  firstName: "Samwise",
  lastName: "Gamgee",
  address: "Bagshot Row 3",
  country: "The Shire",
  city: "Hobbiton",
  zip: "123 45",
  email: "whataboutsecondbreakfast@potatoes.com",
  phone: "+46 70 123 45 67",
};

const confirmButton = document.getElementById(
  "confirm-order-btn",
) as HTMLButtonElement | null;

const shippingForm = document.getElementById(
  "shipping-form",
) as HTMLElement | null;

function typeText(input: HTMLInputElement, text: string, speed = 40) {
  let index = 0;
  input.value = "";

  const interval = setInterval(() => {
    input.value += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

export function initShippingForm() {
  // autofill typing logic
  Object.entries(autoFillData).forEach(([id, value]) => {
    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) return;

    input.addEventListener("focus", () => {
      if (!input.value) {
        typeText(input, value);
      }
    });
  });
  // validation on confirm button click
  confirmButton?.addEventListener("click", (event) => {
    event.preventDefault(); // prevents form submission / reload

    if (!shippingForm) return;

    const inputs = shippingForm.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;

    let hasErrors = false;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("input--error");
        hasErrors = true;
      } else {
        input.classList.remove("input--error");
      }
    });
  });
}
