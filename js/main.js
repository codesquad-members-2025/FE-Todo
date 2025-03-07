import columnsData from '../data/columnData.js';
import { createColumn, createTaskCard } from './components.js';

//dom에 요소 추가하는 함수
function appendToDom(parentElement, newElement) {
  parentElement.insertAdjacentHTML('beforeend', newElement);
}

// 칼럼 생성
function renderColumns(columnData) {
  columnData.forEach((column) => {
    const columnHtml = createColumn(column.id, column.title, column.taskCount);
    const columnContainer = document.querySelector('#columns-container');
    appendToDom(columnContainer, columnHtml);
  });
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnData) {
  columnData.forEach((column) => {
    const columnCardList = document.querySelector(`#${column.id} .card-list`);
    const taskCardsHtml = column.tasks
      .map((task) =>
        createTaskCard(task.id, task.title, task.content, task.author)
      )
      .join('');

    appendToDom(columnCardList, taskCardsHtml);
  });
}

// 칼럼과 카드 렌더링을 호출하는 메인 함수
function renderColumnsAndCards(columnData) {
  renderColumns(columnData); // 칼럼 생성
  renderCardsForColumn(columnData); // 카드 추가
}

// 카드 데이터 제거
function clearCards() {
  document.querySelectorAll('.column').forEach((columnElement) => {
    const columnCardList = columnElement.querySelector('.card-list');
    if (columnCardList) {
      columnCardList.innerHTML = ''; // 각 칼럼의 카드 리스트만 비우기
    }
  });
}

//정렬 버튼 클릭 이벤트
function sortCards(event) {
  const sortButton = event.currentTarget;
  const sortButtonName = sortButton.querySelector('.sort-btn-name');
  const currentType = sortButton.dataset.type;

  const newType = currentType === 'created' ? 'latest' : 'created';
  const buttonText = newType === 'created' ? '생성순' : '최신순';

  // 상태 변경 및 버튼 텍스트 업데이트
  updateButtonState(sortButton, sortButtonName, newType, buttonText);

  // 데이터 정렬
  const sortedData = getSortedData(newType);

  // 카드 업데이트
  clearCards();
  renderCardsForColumn(sortedData);
}

// 버튼 상태 업데이트 함수
function updateButtonState(sortButton, sortButtonName, newType, buttonText) {
  sortButton.dataset.type = newType;
  sortButtonName.textContent = buttonText;
}

// sort 데이터 가져오기
function getSortedData(type) {
  return type === 'created'
    ? sortTasksByCreationOrder(columnsData)
    : sortTasksByLatest(columnsData);
}

//생성순 정렬
function sortTasksByCreationOrder(columnData) {
  return columnData.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    ),
  }));
}

//최신순 정렬
function sortTasksByLatest(columnData) {
  return columnData.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  }));
}

renderColumnsAndCards(columnsData);

const sortButton = document.getElementById('sort-btn');
sortButton.addEventListener('click', sortCards);
