export const initFooter = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("/footer.html");

      if (!res.ok) {
        throw new Error(`Footer not found: ${res.status}`);
      }

      const html = await res.text();

      const footer = document.getElementById("footer");
      if (footer) {
        footer.innerHTML = html;
      }
    } catch (err) {
      console.error("Footer load failed:", err);
    }
  });
};