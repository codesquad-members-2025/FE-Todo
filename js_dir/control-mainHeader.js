const initialize = function () {
  const sections = document.querySelectorAll(".columnlist__col");

  sections.forEach((section) => {
    const addBtn = section.querySelector(".add-task-btn");
    const closeBtn = section.querySelector(".delete-task-btn");
    const taskModal = section.querySelector(".task-modal-overlay");

    addBtn.addEventListener("click", () => {
      taskModal.classList.toggle("active"); // 모달 토글
    });
    closeBtn.addEventListener("click", () => {
      //해당 컬럼의 할 일 카드 모두 삭제
    });
  });
};

export { initialize };
