import mockData from '../data/columnData.js';
import { createColumn, createTaskCard } from './components.js';

//dom에 요소 추가하는 함수
function appendToDom(parentElement, newElement) {
  parentElement.insertAdjacentHTML('beforeend', newElement);
}

// 칼럼 및 카드 생성 함수
function renderColumnsAndCards(columnData) {
  columnData.forEach((column) => {
    // 칼럼 생성 및 추가
    const columnHtml = createColumn(column.id, column.title, column.taskCount);
    const columnContainer = document.querySelector('#columns-container');
    appendToDom(columnContainer, columnHtml);

    // 각 칼럼의 카드 리스트에 카드 추가
    const columnCardList = document.querySelector(`#${column.id} .card-list`);
    const taskCardsHtml = column.tasks
      .map((task) =>
        createTaskCard(task.id, task.title, task.content, task.author)
      )
      .join('');

    appendToDom(columnCardList, taskCardsHtml);
  });
}

renderColumnsAndCards(mockData.columns);
