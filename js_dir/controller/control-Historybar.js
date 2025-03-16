import { makeDeleteAlert } from "../template/template.js";
const SidebarController = (function () {
  const historySidebar = document.getElementById("popover-sidebar");
  const deleteModal = document.getElementById("delete-history__modal");
  const alertMessage = "모든 사용자 활동 기록을 삭제할까요?";
  const cancel = "취소";
  function toggleSidebar() {
    historySidebar.classList.toggle("open");
  }

  function closeSidebar() {
    historySidebar.classList.remove("open");
  }

  function makeAlert() {
    const alertModal = makeDeleteAlert(alertMessage, cancel);
    deleteModal.innerHTML = alertModal;
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
  // --------------위에는 컴포넌트 부분
  // ✅ 이벤트 리스너 초기화 함수
  function initialize() {
    makeAlert();
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
