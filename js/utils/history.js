import { createHistoryItem } from '../components/components.js';
import { addElementToParent } from './dom.js';

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
  const historySection = document.querySelector('#history-section');

  const historyItemsHtml = historyList.reduce(
    (acc, { username, profileImage, actionText, timestamp }) => {
      return (
        acc + createHistoryItem(username, profileImage, actionText, timestamp)
      );
    },
    ''
  );

  addElementToParent(historySection, historyItemsHtml);
}

export { toggleHistory, renderHistoryItems };
