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

function clearColumnsAndCards() {
  const parentElement = document.querySelector('#columns-container');
  parentElement.innerHTML = ''; // 기존 요소들 모두 삭제
}

//정렬 버튼 클릭 이벤트
function sortCards(event) {
  const sortButton = event.currentTarget;
  const sortButtonName = sortButton.querySelector('.sort-btn-name');
  const currentType = sortButton.dataset.type;

  // 상태 변경 및 버튼 텍스트 업데이트 함수
  const updateButtonState = (newType, buttonText) => {
    sortButton.dataset.type = newType;
    sortButtonName.textContent = buttonText;
  };

  // 정렬 기준에 맞는 데이터 반환 함수
  const getSortedData = (type) => {
    return type === 'created'
      ? sortTasksByCreationOrder(mockData.columns)
      : sortTasksByLatest(mockData.columns);
  };

  // 데이터 정렬
  const sortedData = getSortedData(currentType);

  // 상태 업데이트 및 랜더링
  if (currentType === 'created') {
    updateButtonState('latest', '최신순');
  } else {
    updateButtonState('created', '생성순');
  }

  // 기존 데이터 제거 후 정렬된 데이터로 랜더링
  clearColumnsAndCards();
  renderColumnsAndCards(sortedData);
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

renderColumnsAndCards(mockData.columns);

const sortButton = document.getElementById('sort-btn');
sortButton.addEventListener('click', sortCards);
