document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/header.html");
    const html = await res.text();

    const header = document.getElementById("header");
    if (header) {
      header.innerHTML = html;
    }
  } catch (err) {
    console.error("Header load failed:", err);
  }
});