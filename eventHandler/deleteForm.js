export function eventDelete() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !button.classList.contains("delete")) return;
    // .delete를 포함할 경우
    // 부모요소에 show-card가 있는지 확인 -> 카드를 삭제하는 기능
    const isShowCard = button.closest(".show-card");
    if (isShowCard) return isShowCard.remove();

    // 부모요소에 section이 있는지 확인 -> 칼럼 전체 삭제
    button.closest("section").remove();
  });
}
