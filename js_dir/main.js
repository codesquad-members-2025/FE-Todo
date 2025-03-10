// ✅먼저 추가, 닫기 버튼들을 불러온다.
const sections = document.querySelectorAll(".columnlist__col");
sections.forEach((section) => {
  const addBtn = section.querySelector(".add-task-btn");
  const closeBtn = section.querySelector(".delete-task-btn");
  const taskModal = section.querySelector(".task-modal-overlay");

  addBtn.addEventListener("click", () => {
    taskModal.classList.add("active"); // 모달 보이기
  });
  closeBtn.addEventListener("click", () => {
    taskModal.classList.remove("active"); // 모달 보이기
  });
});
