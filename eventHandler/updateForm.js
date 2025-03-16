import { processAddCard } from "./column.js";
import { createAddCardForm } from "./createForm.js";

export function update() {
  document.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit");
    if (!editButton) return;
    // edit 클릭 시
    // 가장 가까운 카드를 찾아서 해당 내용을 그대로 유지한 상태로 입력 폼 작성
    const cardTotalContent = event.target.closest(".show-card");
    const title = cardTotalContent.querySelector("h3").textContent;
    let content = cardTotalContent.querySelector("span").innerHTML;
    content = content.replace(/<br\/?>/g, "\n");
    content = content.replace(/&nbsp;/g, " ");

    const cardList = cardTotalContent.parentElement;
    // 입력 폼 만들기
    const modifyCard = createAddCardForm();

    // 해당 위치에 배치 -> 기존 자식 요소 앞에 새로운 요소를 넣는다
    cardList.insertBefore(modifyCard, cardTotalContent);
    cardTotalContent.remove();

    // 기존 내용을 담게 하기
    modifyCard.querySelector("input").value = title;
    modifyCard.querySelector("textarea").value = content;
    processAddCard(modifyCard);
  });
}
