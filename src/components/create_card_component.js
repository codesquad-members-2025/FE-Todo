// Create Task Card Component
export const CreateCardComponent = ({ title, description, author }) => `
  <div class="task-create-card task-card flex-column flex-justify-space-between">
    <div class="task-create-card__input flex-column flex-center">
      <div class="task-create-card__input-title flex flex-center">
        <input class="card-input-title" placeholder="제목을 입력하세요" />
      </div>
      <div class="task-create-card__input-description flex flex-center">
        <input
          class="card-input-description"
          type="text"
          placeholder="내용을 입력하세요"
        />
      </div>
    </div>
    <div class="task-create-card__btn flex flex-center">
      <button class="task-create-card__btn-cancel">취소</button>
      <button class="task-create-card__btn-create">등록</button>
    </div>
  </div>
`;
