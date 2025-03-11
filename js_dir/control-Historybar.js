import { setupClickDelegate } from "./body_eventDelegate.js";

setupClickDelegate(".header__history-btn", (el) => {
  const sideBar = el.closest("body").nextElementSibling;
});

const historyBtn = document.querySelector(".header__history-btn");
const historySidebar = document.querySelector(".popover-sidebar");
const closeBtn = historySidebar.querySelector(".popover-header__closeBtn");
const deleteBtn = historySidebar.querySelector(".delete-sidebar_button");
const deleteModal = document.querySelector("#delete-history__modal");

historyBtn.addEventListener("click", () => {
  historySidebar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
  historySidebar.classList.remove("open");
});
deleteBtn.addEventListener("click", () => {
  deleteModal.showModal();

  deleteModal.querySelector("#cancel-button").addEventListener("click", () => {
    deleteModal.close();
  });

  deleteModal
    .querySelector("#confirm-delete-button")
    .addEventListener("click", () => {
      const logSection = historySidebar.querySelector(".activity-list__ul");

      if (logSection) {
        logSection.innerHTML = "";
      }
      const emptyMessage = historySidebar.querySelector(
        ".popover__empty-message"
      );
      if (emptyMessage) {
        emptyMessage.style.display = "block";
      }

      deleteModal.close();
    });
});
