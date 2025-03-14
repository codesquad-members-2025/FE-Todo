import { createColumn, createTaskCard } from './template.js';
import { pushChild, unshiftChild } from '../utils/dom.js';
import { getISOStringNow, generateUUID } from '../utils/generalUtils.js';
import { openDeleteCardModal } from './modal.js';
import {
  loadColumnsData,
  updateCard,
  removeCard,
  getSortedCardsByDate,
} from '../../store/column.js';

// ──────────────────────────────
//  1. 데이터 로딩 및 초기 렌더링
// ──────────────────────────────

// 전체 칼럼과 카드 렌더링
async function initColumnAndCard() {
  const columnsData = await loadColumnsData();

  renderColumns(columnsData);
  renderCardsForColumn(columnsData);

  initKanbanEvents();
  initSortButton();
}

// 전체 칼럼 생성
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

  if (isSortCreated()) {
    pushChild(column, taskCardHtml);
  } else {
    unshiftChild(column, taskCardHtml);
  }
}

// 생성순 정렬 여부 반환
function isSortCreated() {
  const sortButtonLabel = document.querySelector('#sort-btn').dataset.type;
  return sortButtonLabel === 'created';
}

// ──────────────────────────────
//  2. 카드 추가 및 삭제
// ──────────────────────────────

// 새 카드 생성
function createNewCard(target) {
  const column = getColumn(target);
  if (!column) return;

  const formCard = getCardForm(column);
  if (!formCard) return;

  const inputData = collectInputData(formCard);
  if (!inputData) return;

  closeCardForm(formCard);
  saveAndRenderCard(column.id, inputData);
  resetValues(formCard);
}

// 카드 데이터 저장 & UI 업데이트
function saveAndRenderCard(columnId, inputData) {
  updateCard(columnId, inputData);
  renderCard(columnId, inputData);
}

// 입력 값 초기화
function resetValues(formCard) {
  formCard.querySelector('input').value = '';
  formCard.querySelector('textarea').value = '';
}

// 카드 제거 함수 반환 (고차함수)
function makeCardRemover(cardId) {
  return () => {
    const targetCard = document.getElementById(cardId);
    const column = targetCard.closest('.column');
    const columnId = column.id;

    removeCard(columnId, cardId); // 데이터 제거
    targetCard.remove(); // UI 제거
  };
}

// 각 칼럼의 카드 전부 제거
function clearCards() {
  document.querySelectorAll('.column').forEach(clearCardOfColumn);
}

// 특정 칼럼의 카드 제거
function clearCardOfColumn(columnElement) {
  const columnCardList = columnElement.querySelector('.card-container');
  if (columnCardList) {
    columnCardList.innerHTML = ''; // 카드 리스트 비우기
  }
}

// ──────────────────────────────
//  3. 카드 정렬 기능
// ──────────────────────────────

// 정렬 버튼 클릭 이벤트
async function sortCards({ currentTarget }) {
  const sortButton = currentTarget;
  const sortButtonLabel = sortButton.querySelector('.sort-btn-label');
  const currentSortType = sortButton.dataset.type;

  const { newSortType, buttonText } = toggleSortType(currentSortType);

  updateSortButtonUI(sortButton, sortButtonLabel, newSortType, buttonText);
  applySortedCards(newSortType);
}

// 정렬 타입 변경
function toggleSortType(currentSortType) {
  const newSortType = currentSortType === 'created' ? 'latest' : 'created';
  const buttonText = newSortType === 'created' ? '생성순' : '최신순';
  return { newSortType, buttonText };
}

// 버튼 UI 업데이트
function updateSortButtonUI(button, label, newSortType, buttonText) {
  button.dataset.type = newSortType;
  label.textContent = buttonText;
}

// 정렬 후 UI 반영
function applySortedCards(sortType) {
  const sortedData = getSortedCardsByDate(sortType);
  clearCards();
  renderCardsForColumn(sortedData);
}

// ──────────────────────────────
//  4. 이벤트 핸들링
// ──────────────────────────────

// Kanban 이벤트 위임
function initKanbanEvents() {
  const columnSection = document.getElementById('columns-container');

  const clickHandlers = new Map([
    ['.card-add-btn', toggleCardForm],
    ['.delete-card-btn', openDeleteCardModal],
    ['.form-cancel-btn', toggleCardForm],
    ['.form-create-btn', createNewCard],
  ]);

  columnSection.addEventListener('click', ({ target }) => {
    const closestBtn = target.closest('button');
    if (closestBtn === null) return; // 다른 곳 누르면 실행 X

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
  const sortButton = document.getElementById('sort-btn');
  sortButton.addEventListener('click', sortCards);
}

// ──────────────────────────────
//  5. 카드 폼 관련 기능
// ──────────────────────────────

// 카드 폼 토글
function toggleCardForm(target) {
  const column = getColumn(target);
  const cardForm = getCardForm(column);
  if (!cardForm) return;

  const isVisible = window.getComputedStyle(cardForm).display === 'flex';
  cardForm.style.display = isVisible ? 'none' : 'flex';
}

// 칼럼 요소 가져오기
function getColumn(target) {
  return target.closest('.column');
}

// 카드 폼 가져오기
function getCardForm(column) {
  return column?.querySelector('.card-form') || null;
}

// 입력 데이터 수집 및 검증
function collectInputData(formCard) {
  const input = formCard.querySelector('input');
  const textarea = formCard.querySelector('textarea');

  const title = input?.value;
  const content = textarea?.value;

  if (!title || !content) return null; // 입력값이 없으면 null 반환

  return {
    id: generateUUID(),
    createdAt: getISOStringNow(),
    author: detectDeviceType(),
    title,
    content,
  };
}

// 디바이스 감지
function detectDeviceType() {
  return navigator.maxTouchPoints > 0 ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? 'mobile'
    : 'web';
}

// 입력 폼 닫기
function closeCardForm(formCard) {
  formCard.style.display = 'none';
}

export { clearCards, makeCardRemover, initColumnAndCard };
