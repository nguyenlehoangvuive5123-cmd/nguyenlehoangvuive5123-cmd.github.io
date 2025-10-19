const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalCaption = document.getElementById("modal-caption");
const modalCount = document.getElementById("modal-count");
const closeBtn = document.querySelector(".close");
const pageContent = document.getElementById("page-content");
const dropdownBtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

let currentGallery = [];
let currentIndex = 0;

const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

// DROPDOWN
if (dropdownBtn && dropdownContent) {
  dropdownBtn.addEventListener("click", e => {
    e.stopPropagation();
    dropdownContent.classList.toggle("show");
  });
  window.addEventListener("click", e => {
    if (!dropdownContent.contains(e.target) && !dropdownBtn.contains(e.target)) dropdownContent.classList.remove("show");
  });
}

// SHOW IMAGE
function showGalleryImage() {
  modalImg.classList.remove("show");
  setTimeout(() => {
    modalImg.src = currentGallery[currentIndex];
    modalImg.onload = () => modalImg.classList.add("show");
    modalCount.textContent = currentGallery.length > 1 ? `${currentIndex + 1} / ${currentGallery.length}` : '';
  }, 200);
}

function showCarouselControls(visible) {
  leftArrow.style.display = visible ? "block" : "none";
  rightArrow.style.display = visible ? "block" : "none";
}

// OPEN MODAL
document.querySelectorAll(".art-item").forEach(item => {
  item.addEventListener("click", () => {
    const title = item.getAttribute("data-title") || "";
    const desc = item.getAttribute("data-desc") || "";
    const galleryData = item.getAttribute("data-gallery");

    // Trim whitespace for safe JSON parsing
    currentGallery = galleryData ? JSON.parse(galleryData.replace(/\s+/g, '')) : [item.querySelector("img").src];
    currentIndex = 0;
    showGalleryImage();
    showCarouselControls(currentGallery.length > 1);

    modalTitle.textContent = title;
    modalCaption.textContent = desc;

    modal.style.display = "flex";
    pageContent.classList.add("blurred");
  });
});

// CLOSE MODAL
function closeModal() {
  modal.style.display = "none";
  pageContent.classList.remove("blurred");
  modalImg.classList.remove("show");
}
closeBtn.onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); };

// KEYBOARD & ARROWS
document.addEventListener("keydown", e => {
  if (modal.style.display === "flex") {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft" && currentGallery.length > 1) { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; showGalleryImage(); }
    if (e.key === "ArrowRight" && currentGallery.length > 1) { currentIndex = (currentIndex + 1) % currentGallery.length; showGalleryImage(); }
  }
});

leftArrow.onclick = rightArrow.onclick = e => { e.stopPropagation(); };
leftArrow.addEventListener("click", () => { if (currentGallery.length > 1) { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; showGalleryImage(); } });
rightArrow.addEventListener("click", () => { if (currentGallery.length > 1) { currentIndex = (currentIndex + 1) % currentGallery.length; showGalleryImage(); } });
