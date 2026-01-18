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

export function initShippingForm() {
  Object.entries(autoFillData).forEach(([id, value]) => {
    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) return;

    input.addEventListener("focus", () => {
      if (!input.value) {
        input.value = value;
      }
    });
  });
}
