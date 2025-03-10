import { createColumn, createTaskCard } from './template.js';
import { addElementToParent } from '../utils/dom.js';

// 전체 칼럼 생성: 초기 랜더링시
function renderColumns(columnList) {
  const columnContainer = document.querySelector('#columns-container');

  const columnsHtml = columnList.reduce(
    (acc, { id, title, taskCount }) =>
      (acc += createColumn(id, title, taskCount)),
    ''
  );

  addElementToParent(columnContainer, columnsHtml);
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnList) {
  columnList.forEach(({ id, tasks }) => {
    const columnCardList = document.querySelector(`#${id} .card-list`);
    const taskCardsHtml = tasks.reduce(
      (acc, { id, title, content, author }) =>
        (acc += createTaskCard(id, title, content, author)),
      ''
    );

    addElementToParent(columnCardList, taskCardsHtml);
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
    const columnCardList = columnElement.querySelector('.card-list');
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

export {
  renderColumnsAndCards,
  renderCardsForColumn,
  clearCards,
  makeCardRemover,
};
