export const makeTaskCard = function (title, content) {
  const taskTemplate = `
                
                  <article class="todo-card__textarea">
                    <div class="card-textarea__body">
                      <header class="task-title">${title}</header>
                      <p class="task-content">${content}</p>
                    </div>
                    <footer class="card-textarea__caption">author by web</footer>
                  </article>
                  <div class="card-actions">
                    <button class="delete-task-btn">
                      <img src="/icons/delete-task-btn.svg" alt="delete Button" />
                    </button>
                    <button class="edit-task-btn">
                      <img src="/icons/edit.svg" alt="edit Button" />
                    </button>
                  </div>
              `;

  return taskTemplate;
};

export const makeDeleteAlert = function (type, alertMessage, cancel) {
  const alertTemplate = `
      <div class="delete-history__content ${type}">
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

export const makeLog = function (content, time) {
  const log = `
              <li class="activity-list__list">
                <img src="icons/Image.png" alt="귀여운 개구리" />
                <div class="activity-list__log">
                  <header class="history-log__header">@멋진영민!</header>
                  <div class="log__activityArea">${content}</div>
                  <div class="log__time">${time}분전</div>
                </div>
              </li>
            `;

  return log;
};

export const editModal = function (title, content) {
  const editModal = ` <div class="task-modal">
  <div class="modal-content">
    <textarea type="text" class="modal__input title-input">${title}</textarea>
    <textarea class="modal__input content-input">${content}</textarea>
  </div>
  <footer class="modal-footer">
    <button class="modal-button cancel-button edit">
      <div class="textLabel">취소</div>
    </button>
    <button class="modal-button register-button edit">
      <div class="textLabel">저장</div>
    </button>
  </footer>
</div>`;
  return editModal;
};
