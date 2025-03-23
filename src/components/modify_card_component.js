export const ModifyCardComponent = ({ id, title, description }) => `
  <div class="task-modify-card task-card flex-column flex-justify-space-between card-id=${id}">
    <div class="task-create-card__input flex-column flex-center">
      <div class="task-create-card__input-title flex flex-center">
        <input class="card-input-title" value='${title}'" />
      </div>
      <div class="task-create-card__input-description flex flex-center">
        <input
          class="card-input-description"
          type="text"
          value='${description}'
        />
      </div>
    </div>
    <div class="task-create-card__btn flex flex-center">
      <button class="task-modify-card__btn-cancel">취소</button>
      <button class="task-modify-card__btn-create">등록</button>
    </div>
  </div>
`;
