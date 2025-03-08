// Column 컴포넌트 생성
function createColumn(id, title, taskCount) {
  return `
  <section class="column flex-col" id="${id}">
    <div class="column-area">
      <div class="column-area-left flex-item-center">
        <h2 class="text-bold tx-b16">${title}</h2>
        <div class="number-box flex-item-center">
          <span class="text-weak tx-m12">${taskCount}</span>
        </div>
      </div>
      <div class="column-area-right">
        <button aria-label="Add task">
          <img src="./assets/icons/plus.svg" alt="Add a new task" />
        </button>
        <button aria-label="Delete column">
          <img src="./assets/icons/closed.svg" alt="Delete this column" />
        </button>
      </div>
    </div>
    <div class="card-list flex-col">
      <!-- 카드 항목은 여기서 동적으로 추가 -->
    </div>
  </section>
`;
}

// Task 카드 컴포넌트 생성
function createTaskCard(id, title, content, author) {
  return `
  <article class="todo-card" id="${id}">
    <div class="content-section flex-col">
      <h3 class="text-strong tx-b14">${title}</h3>
      <p class="text-default tx-m14">${content}</p>
      <h6 class="text-weak tx-m12">author by ${author}</h6>
    </div>
    <div class="button-section flex-col">
      <button class= "delete-card-btn" aria-label="Delete task">
        <img src="./assets/icons/closed.svg" alt="Delete this task" />
      </button>
      <button aria-label="Edit task">
        <img src="./assets/icons/edit.svg" alt="Edit this task" />
      </button>
    </div>
  </article>
`;
}

export { createColumn, createTaskCard };
