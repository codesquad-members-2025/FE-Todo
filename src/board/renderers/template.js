import { stringToNode } from '../../shared/utils/dom.js';

// Column 컴포넌트 생성
function createColumn(id, title, taskCount) {
  return stringToNode(`
  <section class="kanban-column flex-col" id="${id}">
    <div class="kanban-column-header">
      <div class="kanban-column-title flex-item-center">
        <h2 class="text-bold tx-b16">${title}</h2>
        <div class="task-counter flex-item-center">
          <span class="text-weak tx-m12">${taskCount}</span>
        </div>
      </div>
      <div class="kanban-column-actions">
        <button class="task-add-btn" aria-label="Add task">
          <div class="plus-icon svg-24 svg-color-weak" role="img" aria-label="Add a new task"></div>
        </button>
        <button aria-label="Delete column">
          <div class="closed-icon svg-24 svg-color-weak" role="img" aria-label="Delete this column"></div>
        </button>
      </div>
    </div>
    <div class="task-list flex-col">
      ${taskForm}
      <div class="task-container flex-col">
        <!-- 카드 항목은 여기서 동적으로 추가 -->
      </div>
    </div>
  </section>
`);
}

const taskForm = `
  <article class="task-form task-common flex-col" style="display: none">
    <div class="task-form-content flex-col">
      <input type="text" class="task-input text-strong tx-m14" placeholder="제목을 입력하세요" value="">
      <textarea class="task-textarea text-default tx-m14" placeholder="내용을 입력하세요" value=""></textarea>
    </div>
    <div class="task-form-actions">
      <button class="task-cancel-btn task-btn text-default tx-b14">
        <span>취소</span>
      </button>
      <button class="task-save-btn task-btn text-white tx-b14">
        <span>등록</span>
      </button>
    </div>
  </article>
`;

function createEditForm(title, content) {
  return stringToNode(`
  <article class="task-form task-common flex-col">
    <div class="task-form-content flex-col">
      <input type="text" class="task-input text-strong tx-m14" placeholder="제목을 입력하세요" value="${title}">
      <textarea class="task-textarea text-default tx-m14" placeholder="내용을 입력하세요" value="">${content}</textarea>
    </div>
    <div class="task-form-actions">
      <button class="task-cancel-btn task-btn text-default tx-b14">
        <span>취소</span>
      </button>
      <button class="task-save-btn task-btn text-white tx-b14">
        <span>수정</span>
      </button>
    </div>
  </article>
`);
}

// Task 카드 컴포넌트 생성
function createTaskCard(id, title, content, author) {
  return stringToNode(`
  <article class="task-item task-common" id="${id}">
    <div class="task-item-content flex-col">
      <h3 class="task-title text-strong tx-b14">${title}</h3>
      <p class="task-content text-default tx-m14">${content}</p>
      <h6 class="text-weak tx-m12">author by ${author}</h6>
    </div>
    <div class="task-item-actions flex-col">
      <button class="task-delete-btn" aria-label="Delete task">
        <div class="closed-icon svg-24 svg-color-weak" role="img" aria-label="Delete this task"></div>
      </button>
      <button class="task-edit-btn" aria-label="Edit task">
        <div class="edit-icon svg-24 svg-color-weak" role="img" aria-label="Edit this task"></div>
      </button>
    </div>
  </article>
`);
}

export { createColumn, createTaskCard, createEditForm };
