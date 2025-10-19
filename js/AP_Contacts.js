const dropdownBtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");
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
