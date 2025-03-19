// src/board/handlers/eventHandlers.js
import {
  toggleTaskForm,
  createNewTask,
  openDeleteTaskDialog,
  toggleModifyFrom,
} from './taskHandlers.js';

import { sortTasks } from './sortHandlers.js';

// Kanban 이벤트 위임
function initKanbanEvents() {
  const columnSection = document.getElementById('kanban-board');

  const clickHandlers = new Map([
    ['.task-add-btn', toggleTaskForm],
    ['.task-delete-btn', openDeleteTaskDialog],
    ['.task-cancel-btn', toggleTaskForm],
    ['.task-save-btn', createNewTask],
    ['.task-edit-btn', toggleModifyFrom],
  ]);

  columnSection.addEventListener('click', ({ target }) => {
    const closestBtn = target.closest('button');
    if (closestBtn === null) return;

    for (const [selector, handler] of clickHandlers) {
      if (closestBtn.matches(selector)) {
        handler(closestBtn);
        break;
      }
    }
  });
}

// Sort Button 이벤트 초기화
function initSortButton() {
  const sortButton = document.getElementById('task-sort-btn');
  sortButton.addEventListener('click', sortTasks);
}

export { initKanbanEvents, initSortButton };
