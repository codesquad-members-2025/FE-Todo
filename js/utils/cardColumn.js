import { createColumn, createTaskCard } from '../components/components.js';
import { addElementToParent } from './dom.js';

// 전체 칼럼 생성: 초기 랜더링시
function renderColumns(columnData) {
  const columnContainer = document.querySelector('#columns-container');

  const columnsHtml = columnData.reduce(
    (acc, { id, title, taskCount }) =>
      (acc += createColumn(id, title, taskCount)),
    ''
  );

  addElementToParent(columnContainer, columnsHtml);
}

// 칼럼에 카드 생성
function renderCardsForColumn(columnsData) {
  columnsData.forEach(({ id, tasks }) => {
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

export { renderColumnsAndCards, renderCardsForColumn, clearCards };
