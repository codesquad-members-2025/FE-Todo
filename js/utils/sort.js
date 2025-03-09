import { clearCards } from './cardColumn.js';
import { renderCardsForColumn } from './cardColumn.js';

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

export { sortCards };
