import { cardComponent } from "./card_component.js";

// 완료한 일 Column
export const columnComponent = ({ title, cards }) => {
  const count = cards.length;

  return `
    <article class="column flex flex-column flex-justify-center">
      <header class="column__header flex flex-justify-space-between">
        <div class="column__header-left flex flex-align-center">
          <h1 class="column__header-title">${title}</h1>
          <h2 class="column__header-card-count">${count}</h2>
        </div>
        <div class="column__header-right flex flex-align-center">
          <img
            class="column__header-right-icon"
            src="../icons/plus.png"
            width="14px"
            alt="할 일(카드)을 추가하는 플러스 아이콘 버튼"
          />
          <img
            class="column__header-right-icon"
            src="../icons/delete.png"
            width="14px"
            alt="할 일(카드)을 지우는 가위표 아이콘 버튼"
          />
        </div>
      </header>
      <!-- Task Card -->
      ${cards.map((card) => cardComponent(card)).join("")}
    </article>
  `;
};
