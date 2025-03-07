import columnData from '../data/columnData.js';
import { createColumn, createTaskCard } from './components.js';

//dom에 요소 추가하는 함수
function appendToDom(parentElement, newElement) {
  parentElement.insertAdjacentHTML('beforeend', newElement);
}

// 칼럼 생성
function renderColumns(columnData) {
  columnData.forEach(({ id, title, taskCount }) => {
    const columnHtml = createColumn(id, title, taskCount);
    const columnContainer = document.querySelector('#columns-container');
    appendToDom(columnContainer, columnHtml);
  });
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnData) {
  columnData.forEach(({ id, tasks }) => {
    const columnCardList = document.querySelector(`#${id} .card-list`);
    const taskCardsHtml = tasks
      .map(({ id, title, content, author }) =>
        createTaskCard(id, title, content, author)
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
  document.querySelectorAll('.column').forEach(clearCardOfColumn);

  function clearCardOfColumn(columnElement) {
    const columnCardList = columnElement.querySelector('.card-list');
    if (columnCardList) {
      columnCardList.innerHTML = ''; // 각 칼럼의 카드 리스트만 비우기
    }
  }
}

//정렬 버튼 클릭 이벤트
function sortCards({ currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonName = sortButton.querySelector('.sort-btn-name');
  const currentSortType = sortButton.dataset.type;

  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';

  // 상태 변경 및 버튼 텍스트 업데이트
  sortButton.dataset.type = newSortType;
  sortButtonName.textContent = buttonText;

  // 데이터 정렬
  const sortedData = sortTasksByDate(columnData, newSortType);

  // 카드 업데이트
  clearCards();
  renderCardsForColumn(sortedData);
}

// 정렬 함수 (order: 'created' | 'latest')
function sortTasksByDate(columnData, order = 'created') {
  return columnData.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort((a, b) => {
      return order === 'created'
        ? new Date(a.createdAt) - new Date(b.createdAt) // 생성순
        : new Date(b.createdAt) - new Date(a.createdAt); // 최신순
    }),
  }));
}

//Sort Button
const sortButton = document.getElementById('sort-btn');
sortButton.addEventListener('click', sortCards);

//history 열기
function openHistory() {
  console.log('오픈!');
  const history = document.querySelector('#history');
  history.style.display = 'flex';
}

const historyButton = document.getElementById('history-open-btn');
historyButton.addEventListener('click', openHistory);

//history 닫기
function closeHistory() {
  console.log('close!');
  const history = document.querySelector('#history');
  history.style.display = 'none';
}

const historyCloseButton = document.getElementById('history-close-btn');
historyCloseButton.addEventListener('click', closeHistory);

//render
renderColumnsAndCards(columnData);
