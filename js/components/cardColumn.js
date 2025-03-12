import { createColumn, createTaskCard } from './template.js';
import { addChild } from '../utils/dom.js';
import { openCardDeleteModal } from './modal.js';
import { loadColumnData } from '../../store/column.js';

// 전체 칼럼 생성: 초기 랜더링시
function renderColumns(columnList) {
  const columnContainer = document.querySelector('#columns-container');

  const columnsHtml = columnList.reduce(
    (acc, { id, title, taskCount }) =>
      (acc += createColumn(id, title, taskCount)),
    ''
  );

  addChild(columnContainer, columnsHtml);
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnList) {
  columnList.forEach(({ id, tasks }) => {
    const columnCardList = document.querySelector(`#${id} .card-container`);
    const taskCardsHtml = tasks.reduce(
      (acc, { id, title, content, author }) =>
        (acc += createTaskCard(id, title, content, author)),
      ''
    );

    addChild(columnCardList, taskCardsHtml);
  });
}

// 칼럼과 카드 렌더링을 호출하는 메인 함수
function renderColumnsAndCards(columnList) {
  renderColumns(columnList); // 칼럼 생성
  renderCardsForColumn(columnList); // 카드 추가
}

// 각 칼럼의 카드 전부 제거
function clearCards() {
  document.querySelectorAll('.column').forEach(clearCardOfColumn);

  function clearCardOfColumn(columnElement) {
    const columnCardList = columnElement.querySelector('.card-container');
    if (columnCardList) {
      columnCardList.innerHTML = ''; // 각 칼럼의 카드 리스트만 비우기
    }
  }
}

// 카드 제거
function makeCardRemover(cardId) {
  return function () {
    const targetCard = document.getElementById(cardId);
    targetCard.remove();
  };
}

//카드 제거 버튼 이벤트 추가 함수
function initCardRemoveButton() {
  const columnSection = document.getElementById('columns-container');
  columnSection.addEventListener('click', openCardDeleteModal);
}

//카드 생성 폼 토글 이벤트
function initToggleCardFormButton() {
  const columnSection = document.getElementById('columns-container');
  columnSection.addEventListener('click', toggleCardForm);
}

//카드 폼 토글 : +버튼 || 폼 삭제 버튼
function toggleCardForm(event) {
  const button =
    event.target.closest('.card-add-btn') ||
    event.target.closest('.form-cancel-btn');

  const column = event.target.closest('.column');
  if (!button) return;

  const cardForm = document.querySelector(
    `#${column.id} .card-list .card-form`
  );
  const isVisable = window.getComputedStyle(cardForm).display === 'flex';

  cardForm.style.display = isVisable ? 'none' : 'flex';
}

//정렬 버튼 클릭 이벤트
function sortCards(columnList, { currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonName = sortButton.querySelector('.sort-btn-name');
  const currentSortType = sortButton.dataset.type;

  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';

  // 상태 변경 및 버튼 텍스트 업데이트
  sortButton.dataset.type = newSortType;
  sortButtonName.textContent = buttonText;

  // 데이터 정렬
  const sortedData = getSortedTasksByDate(columnList, newSortType);

  // 카드 업데이트
  clearCards();
  renderCardsForColumn(sortedData);
}

// 정렬 함수 (order: 'created' | 'latest')
function getSortedTasksByDate(columnList, order = 'created') {
  return columnList.map((column) => ({
    ...column,
    tasks: [...column.tasks].sort((a, b) => {
      return order === 'created'
        ? new Date(a.createdAt) - new Date(b.createdAt) // 생성순
        : new Date(b.createdAt) - new Date(a.createdAt); // 최신순
    }),
  }));
}

//Sort Button
function initSortButton(columnData) {
  const sortButton = document.getElementById('sort-btn');
  sortButton.addEventListener('click', (event) => {
    sortCards(columnData, event);
  });
}

async function initColumnAndCard() {
  const data = await loadColumnData();

  renderColumnsAndCards(data);

  initCardRemoveButton();
  initSortButton(data);
  initToggleCardFormButton();
}

export { clearCards, makeCardRemover, initColumnAndCard };
