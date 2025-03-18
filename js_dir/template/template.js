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
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z" fill="#A0A3BD"/>
</svg>
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
