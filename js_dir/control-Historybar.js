const SidebarController = (function () {
  const historySidebar = document.getElementById("popover-sidebar");
  const deleteModal = document.getElementById("delete-history__modal");

  function toggleSidebar() {
    historySidebar.classList.toggle("open");
  }

  function closeSidebar() {
    historySidebar.classList.remove("open");
  }
  function showDeleteModal() {
    deleteModal.showModal();
  }
  function closeDeleteModal() {
    deleteModal.close();
  }
  function deleteHistory() {
    const logSection = historySidebar.querySelector("#activity-list__ul");
    if (logSection) {
      logSection.innerHTML = "";
    }
    const emptyMessage = historySidebar.querySelector(
      "#popover__empty-message"
    );
    if (emptyMessage) {
      emptyMessage.style.display = "block";
    }
    closeDeleteModal();
  }

  // ✅ 이벤트 리스너 초기화 함수
  function initialize() {
    const historyBtn = document.getElementById("header__history-btn");
    const closeBtn = historySidebar.querySelector("#popover-header__closeBtn");
    const deleteBtn = historySidebar.querySelector("#delete-sidebar_button");
    const cancelBtn = deleteModal.querySelector("#cancel-button");

    historyBtn.addEventListener("click", toggleSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    deleteBtn.addEventListener("click", showDeleteModal);
    cancelBtn.addEventListener("click", closeDeleteModal);
    cancelBtn.nextElementSibling.addEventListener("click", deleteHistory);
  }

  return { initialize };
})();

export { SidebarController };
