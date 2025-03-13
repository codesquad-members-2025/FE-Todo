export const makeTaskCard = function (id, title, content) {
  const taskTemplate = `
                <div id ="${id}" class="todo-card">
                  <article class="todo-card__textarea">
                    <div class="card-textarea__body">
                      <header class="task-title">${title}</header>
                      <p class="task-content">${content}</p>
                    </div>
                    <footer class="card-textarea__caption">author by web</footer>
                  </article>
                  <div class="card-actions">
                    <button class="delete-task-btn">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z" fill="#A0A3BD"/>
</svg>
                    </button>
                    <button class="edit-task-btn">
                      <img src="/icons/edit.svg" alt="edit Button" />
                    </button>
                  </div>
                </div>
              `;

  return taskTemplate;
};

export const makeDeleteAlert = function (alertMessage, cancel) {
  const alertTemplate = `
      <div class="delete-history__content">
        <p>${alertMessage}</p>
        <div class="delete-history__buttons">
          <button class="delete-history__button" id="cancel-button">
            <div class="textLabel">${cancel}</div>
          </button>
          <button class="delete-history__button" id="confirm-delete-button">
            <div class="textLabel">삭제</div>
          </button>
        </div>
      </div>
   `;
  return alertTemplate;
};

export const makeCalumnTemplate = function () {
  `
  <section class="columnlist__col" data-type="todo">
        <header class="columnlist__header">
          <div>
            <p class="columnlist__tilte">${title}</p>
            <p class="columnlist__count">${count}</p>
          </div>
          <div>
            <button class="add-task-btn">
              <img src="/icons/plus_icon.svg" alt="plus-icon" />
            </button>
            <button class="delete-task-btn">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z"
                  fill="#A0A3BD"
                />
              </svg>
            </button>
          </div>
        </header>
        <!--  할일 추가 카드 모달 -->
        <div class="task-modal-overlay" data-type="${dataType}">
          <div class="task-modal">
            <div class="modal-content">
              <input
                type="text"
                class="modal__input title-input"
                placeholder="제목을 입력하세요"
              />
              <input
                type="text"
                class="modal__input content-input"
                placeholder="내용을 입력하세요"
              />
            </div>
            <footer class="modal-footer">
              <button class="modal-button cancel-button">
                <div class="textLabel">취소</div>
              </button>
              <button class="modal-button register-button">
                <div class="textLabel">등록</div>
              </button>
            </footer>
          </div>
        </div>
        <!-- ✅ 할 일 카드들이 추가될 공간 -->
        <div class="task-list" data-type="${dataType}">
        ${cards}
        </div>
      </section>
  `;
};
