import { createHistoryItem } from './template.js';
import { pushChild } from '../utils/dom.js';
import { openHistoryDeleteModal } from './modal.js';
import { loadHistoryData } from '../../store/history.js';

function renderHistoryItems(historyList) {
  if (historyList.length === 0) {
    setHistoryDefaultUI(true);
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

  pushChild(historyContainer, historyItemsHtml);
  setHistoryDeleteButton(true); // 기록삭제 버튼 보여주기
}

// Remove history record
function removeHistoryRecords() {
  document.getElementById('history-container').innerHTML = '';
  setHistoryDefaultUI(true);
  setHistoryDeleteButton(false); // 기록삭제 버튼 감추기
}

//history 열기
function toggleHistory() {
  const history = document.querySelector('#history');
  const isVisable = window.getComputedStyle(history).display === 'flex';

  history.style.display = isVisable ? 'none' : 'flex';
}

// Toggle Default history
function setHistoryDefaultUI(isVisible) {
  const historyDefault = document.getElementById('history-default');
  historyDefault.style.display = isVisible ? 'flex' : 'none';
}

// Toggle History Footer
function setHistoryDeleteButton(isVisible) {
  const footerElement = document.querySelector('#history footer');
  footerElement.style.display = isVisible ? 'flex' : 'none';
}

//History Event Listener
function initHistoryButton() {
  const historyButton = document.getElementById('history-open-btn');
  historyButton.addEventListener('click', toggleHistory);

  const historyCloseButton = document.getElementById('history-close-btn');
  historyCloseButton.addEventListener('click', toggleHistory);

  const historyDeleteButton = document.getElementById('history-delete-btn');
  historyDeleteButton.addEventListener('click', openHistoryDeleteModal);
}

async function initHistory() {
  const data = await loadHistoryData();

  renderHistoryItems(data);

  initHistoryButton();
}

export { initHistory, removeHistoryRecords };
