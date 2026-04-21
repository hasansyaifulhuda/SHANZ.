// ===============================
// ELEMENT
// ===============================
const container = document.getElementById("links");
const searchInput = document.getElementById("search");
const categoryContainer = document.getElementById("categories");

let currentCategory = "all";

/* kategori */
const categories = ["all", ...data.map(d => d.category)];

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
/* DATA */
/* =============================== */
function getAllItems() {
  return data.flatMap(d => d.items);
}

/* =============================== */
/* RENDER LINKS */
/* =============================== */
function renderLinks() {
  container.innerHTML = "";
  const keyword = searchInput.value.toLowerCase();

  let items = currentCategory === "all"
    ? getAllItems()
    : (data.find(d => d.category === currentCategory)?.items || []);

  items.forEach(item => {
    if (item.name.toLowerCase().includes(keyword)) {
      const a = document.createElement("a");
      a.href = item.url;
      a.className = "btn";
      a.target = "_blank";
      a.innerHTML = `
  <img src="${item.icon}" class="icon">
  <span>${item.name}</span>
`;
      container.appendChild(a);
    }
  });
}

/* search */
searchInput.addEventListener("input", renderLinks);

/* init */
renderCategories();
renderLinks();


// ===============================
// DRAG SCROLL (NATURAL)
// ===============================
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