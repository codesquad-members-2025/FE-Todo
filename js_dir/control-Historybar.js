const historyBtn = document.getElementById("header__history-btn");
const historySidebar = document.getElementById("popover-sidebar");
const closeBtn = historySidebar.querySelector("#popover-header__closeBtn");
const deleteBtn = historySidebar.querySelector("#delete-sidebar_button");
const deleteModal = document.getElementById("delete-history__modal");
const logSection = historySidebar.querySelector("#activity-list__ul");

historyBtn.addEventListener("click", () => {
  historySidebar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
  historySidebar.classList.remove("open");
});

deleteBtn.addEventListener("click", () => {
  deleteModal.showModal();
  const cancelBtn = deleteModal.querySelector("#cancel-button");

  cancelBtn.addEventListener("click", () => {
    deleteModal.close();
  });

  cancelBtn.nextElementSibling.addEventListener("click", () => {
    if (logSection) {
      logSection.innerHTML = "";
    }
    const emptyMessage = historySidebar.querySelector(
      "#popover__empty-message"
    );
    if (emptyMessage) {
      emptyMessage.style.display = "block";
    }

    deleteModal.close();
  });
});
