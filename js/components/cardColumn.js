import { createColumn, createTaskCard } from './template.js';
import { pushChild, unshiftChild } from '../utils/dom.js';
import { getISOStringNow, generateUUID } from '../utils/generalUtils.js';
import { openCardDeleteModal } from './modal.js';
import {
  loadColumnsData,
  updateCard,
  removeCard,
  getSortedCardsByDate,
} from '../../store/column.js';

// 전체 칼럼 생성: 초기 랜더링시
function renderColumns(columnsData) {
  const columnContainer = document.querySelector('#columns-container');

  const columnsHtml = columnsData.reduce(
    (acc, { id, title, taskCount }) =>
      (acc += createColumn(id, title, taskCount)),
    ''
  );

  pushChild(columnContainer, columnsHtml);
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnsData) {
  columnsData.forEach(({ id, tasks }) => {
    const columnCardList = document.querySelector(`#${id} .card-container`);
    const taskCardsHtml = tasks.reduce(
      (acc, { id, title, content, author }) =>
        (acc += createTaskCard(id, title, content, author)),
      ''
    );

    pushChild(columnCardList, taskCardsHtml);
  });
}

// 칼럼에 카드 하나 생성
function renderCard(columnId, cardData) {
  const { id, title, content, author } = cardData;
  const column = document.querySelector(`#${columnId} .card-container`);

  const taskCardHtml = createTaskCard(id, title, content, author);

  // 생성순/최신순에 따라 맞게 카드 넣기
  if (isSortCreated()) {
    pushChild(column, taskCardHtml);
  } else {
    unshiftChild(column, taskCardHtml);
  }
}

// 칼럼과 카드 렌더링을 호출하는 메인 함수
async function renderColumnsAndCards(columnsData) {
  renderColumns(columnsData); // 칼럼 생성
  renderCardsForColumn(columnsData); // 카드 추가
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

// 카드 제거 함수 반환(고차함수)
function makeCardRemover(cardId) {
  return function () {
    const targetCard = document.getElementById(cardId);
    const columnId = targetCard.closest('.column').id;
    targetCard.remove();
    //데이터에서도 제거
    removeCard(columnId, cardId);
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
function toggleCardForm({ target }) {
  const button =
    target.closest('.card-add-btn') || target.closest('.form-cancel-btn');

  if (!button) return;

  const cardForm = getCardForm(target);
  if (!cardForm) return;

  const isVisible = window.getComputedStyle(cardForm).display === 'flex';
  cardForm.style.display = isVisible ? 'none' : 'flex';
}

//정렬 버튼 클릭 이벤트
async function sortCards({ currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonLabel = sortButton.querySelector('.sort-btn-label');
  const currentSortType = sortButton.dataset.type;

  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';

  // 상태 변경 및 버튼 텍스트 업데이트
  sortButton.dataset.type = newSortType;
  sortButtonLabel.textContent = buttonText;

  // 데이터 정렬
  const sortedData = getSortedCardsByDate(newSortType);

  // 카드 업데이트
  clearCards();
  renderCardsForColumn(sortedData);
}

function isSortCreated() {
  const sortButtonLabel = document.querySelector('#sort-btn').dataset.type;
  return sortButtonLabel === 'created';
}

//Sort Button
function initSortButton() {
  const sortButton = document.getElementById('sort-btn');
  sortButton.addEventListener('click', (event) => {
    sortCards(event);
  });
}

// 새 카드 폼 생성
function createNewCard({ target }) {
  const createButton = target.closest('.form-create-btn');
  if (!createButton) return;

  const cardForm = getCardForm(target);
  if (!cardForm) return;

  const column = target.closest('.column');
  if (!column) return;

  const inputData = getInputData(column);
  if (!inputData) return;

  // 입력폼 닫기
  cardForm.style.display = 'none';

  // 데이터 업데이트 & UI 추가
  updateCard(column.id, inputData);
  renderCard(column.id, inputData);
}

function getInputData(columnEl) {
  const createdAt = getISOStringNow();
  const id = generateUUID();
  const author = isMobile() ? 'mobile' : 'web';

  // value 가져오기
  const formCard = columnEl.querySelector('.card-form');
  const [input, textarea] = formCard.querySelectorAll('input, textarea');
  const title = input.value;
  const content = textarea.value;

  if (!title || !content) return null; // 데이터 입력하지 않으면 null 반환

  // 객체 생성
  return makeInputData(id, title, content, author, createdAt);
}

//card form 요소 가져오기(공통)
function getCardForm(target) {
  const column = target.closest('.column');
  if (!column) return null;

  return document.querySelector(`#${column.id} .card-list .card-form`);
}

function isMobile() {
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    navigator.maxTouchPoints > 0
  );
}

function makeInputData(id, title, content, author, createdAt) {
  return {
    id,
    title,
    content,
    author,
    createdAt,
  };
}

// 새카드 등록 버튼
function initCreateCardBtn() {
  const columnSection = document.getElementById('columns-container');
  columnSection.addEventListener('click', (event) => createNewCard(event));
}

async function initColumnAndCard() {
  const data = await loadColumnsData();

  renderColumnsAndCards(data);
  initCardRemoveButton();
  initSortButton();
  initToggleCardFormButton();
  initCreateCardBtn();
}

export { clearCards, makeCardRemover, initColumnAndCard };
