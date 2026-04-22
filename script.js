// ===============================
// ELEMENT
// ===============================
const container = document.getElementById("links");
const searchInput = document.getElementById("search");
const categoryContainer = document.getElementById("categories");

let currentCategory = "all";

/* =============================== */
/* CATEGORY LIST (AUTO) */
/* =============================== */
const categories = [
  "all",
  ...data.map(d => d.category.toLowerCase())
];

/* =============================== */
/* RENDER CATEGORY */
/* =============================== */
function renderCategories() {
  categoryContainer.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.toUpperCase();

    if (cat === currentCategory) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      currentCategory = cat;
      renderCategories();
      renderLinks();
    };

    categoryContainer.appendChild(btn);
  });
}

/* =============================== */
/* AMBIL SEMUA ITEM */
/* =============================== */
function getAllItems() {
  return data.flatMap(d => d.items);
}

/* =============================== */
/* RENDER LINKS (FIX + DESCRIPTION) */
/* =============================== */
function renderLinks() {
  container.innerHTML = "";
  const keyword = searchInput.value.toLowerCase();

  let items =
    currentCategory === "all"
      ? getAllItems()
      : (data.find(d => d.category.toLowerCase() === currentCategory)?.items || []);

  items.forEach(item => {
    if (item.name.toLowerCase().includes(keyword)) {
      const a = document.createElement("a");
      a.href = item.url;
      a.className = "btn";
      a.target = "_blank";

      a.innerHTML = `
        <div class="icon">
          <img src="${item.icon}" alt="">
        </div>

        <div class="text">
          <div class="title">${item.name}</div>
          <div class="desc">${item.description || ""}</div>
        </div>
      `;

      container.appendChild(a);
    }
  });
}

/* =============================== */
/* SEARCH */
/* =============================== */
searchInput.addEventListener("input", renderLinks);

/* =============================== */
/* INIT */
/* =============================== */
renderCategories();
renderLinks();

/* =============================== */
/* DRAG SCROLL (PC SUPPORT) */
/* =============================== */
const slider = document.querySelector(".categories");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});