// Task Card Component
export const cardComponent = ({ id, title, description, author }) => `
  <div class="task-card flex flex-justify-space-between card-id=${id}">
    <div class="task-card__left">
      <h1 class="task-card__title">${title}</h1>
      <h2 class="task-card__description">${description}</h2>
      <h3 class="task-card__author">author by ${author}</h3>
    </div>
    <div class="task-card__right flex flex-column flex-justify-start">
      <div class="task-card__right-delete-icon">
        <img
          src="./images/delete.png"
          width="14px"
          alt="카드를 삭제하는 가위표 아이콘 버튼"
        />
      </div> 
      <div class="task-card__right-modify-icon">
        <img
          class="task-card__right-modify-icon"
          src="./images/pen.png"
          width="14px"
          alt="카드를 수정하는 펜 아이콘 버튼"
        />
      </div>
    </div>
  </div>
`;
