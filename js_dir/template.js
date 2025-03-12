export const makeTaskCard = function (title, content) {
  const taskTemplate = `
                <div class="todo-card">
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
                </div>
              `;

  return taskTemplate;
};
