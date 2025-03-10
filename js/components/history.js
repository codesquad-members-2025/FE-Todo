import { createHistoryItem } from './template.js';
import { addElementToParent } from '../utils/dom.js';

//history 열기
function toggleHistory() {
  const history = document.querySelector('#history');
  const isVisable = window.getComputedStyle(history).display === 'flex';

  if (!isVisable) {
    history.style.display = 'flex';
  } else {
    history.style.display = 'none';
  }
}

function renderHistoryItems(historyList) {
  // 활동기록이 없으면 default 띄우기
  if (historyList.length === 0) {
    toggleHistoryDefaultUi(true);
    return;
  }
  const historyContainer = document.querySelector('#history-container');

  const historyItemsHtml = historyList.reduce(
    (acc, { username, profileImage, actionText, timestamp }) => {
      return (
        acc + createHistoryItem(username, profileImage, actionText, timestamp)
      );
    },
    ''
  );

  addElementToParent(historyContainer, historyItemsHtml);
  toggleDeleteButton(true); // 기록삭제 버튼 보여주기
}

// Remove history record
function removeHistoryRecords() {
  document.getElementById('history-container').innerHTML = '';
  toggleHistoryDefaultUi(true);
  toggleDeleteButton(false); // 기록삭제 버튼 감추기
}

// Toggle Default history
function toggleHistoryDefaultUi(show) {
  const historyDefault = document.getElementById('history-default');
  historyDefault.style.display = show ? 'flex' : 'none';
}

// Toggle History Footer
function toggleDeleteButton(show) {
  const footerElement = document.querySelector('#history footer');
  footerElement.style.display = show ? 'flex' : 'none';
}

export {
  toggleHistory,
  renderHistoryItems,
  removeHistoryRecords,
  toggleHistoryDefaultUi,
};
