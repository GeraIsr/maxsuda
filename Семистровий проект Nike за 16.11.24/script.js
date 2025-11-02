const swiper = new swiper(".swiper", {
  pagination: { el: ".swiper-pagination", clickable: true },
  loop: true,
  autoplay: { delay: 2500, disableOnInteraction: false },
});


window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});


document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


const modal = document.getElementById("orderModal");
const openBtns = document.querySelectorAll(".order-btn");
const closeModal = document.querySelector(".close-modal");

openBtns.forEach(btn => btn.addEventListener("click", e => {
  e.preventDefault();
  modal.classList.add("active");
}));

closeModal.addEventListener("click", () => modal.classList.remove("active"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});


const grid = document.getElementById("productsGrid");
const API_KEY = "YOUR_RAPIDAPI_KEY_HERE"; 

async function loadProducts() {
  try {
    const res = await fetch("https://nike-products.p.rapidapi.com/shoes", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "nike-products.p.rapidapi.com"
      }
    });
    const data = await res.json();
    grid.innerHTML = "";

    data.slice(0, 6).forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.title}">
        <h3>${prod.title}</h3>
        <p>${prod.category}</p>
        <span class="product-price">$${prod.price}</span>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = "<p>Не вдалося завантажити продукти</p>";
    console.error(err);
  }
}
loadProducts();
