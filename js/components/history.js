import { createHistoryItem } from './template.js';
import { pushChild } from '../utils/dom.js';
import { openHistoryDeleteModal } from './modal.js';
import { loadHistoryData } from '../../store/history.js';

// ──────────────────────────────
//  1. 캐싱된 DOM 요소(동적이 요소가 아닌 DOM 요소)
// ──────────────────────────────
const historyContainer = document.getElementById('history-container');
const historyDefault = document.getElementById('history-default');
const historyFooter = document.querySelector('#history-sidebar footer');
const historySection = document.getElementById('history-sidebar');

// ──────────────────────────────
//  2. 기록 렌더링 및 삭제
// ──────────────────────────────

// 기록 렌더링
function renderHistoryItems(historyList) {
  if (historyList.length === 0) {
    setHistoryDefaultUI(true);
    return;
  }

  const historyItemsHtml = historyList.reduce(
    (items, { username, profileImage, actionText, timestamp }) => {
      return (
        items + createHistoryItem(username, profileImage, actionText, timestamp)
      );
    },
    ''
  );

  pushChild(historyContainer, historyItemsHtml);
  setHistoryDeleteButton(true);
}

// 기록 삭제
function removeHistoryRecords() {
  historyContainer.innerHTML = '';
  setHistoryDefaultUI(true);
  setHistoryDeleteButton(false);
}

// ──────────────────────────────
//  3. UI 토글 함수
// ──────────────────────────────

// 히스토리 열기/닫기
function toggleHistory() {
  setHistoryVisibility(historySection.style.display !== 'flex');
}

// 히스토리 표시 여부 설정
function setHistoryVisibility(isVisible) {
  historySection.style.display = isVisible ? 'flex' : 'none';
}

// 기본 UI 표시 여부
function setHistoryDefaultUI(isVisible) {
  historyDefault.style.display = isVisible ? 'flex' : 'none';
}

// 기록 삭제 버튼 표시 여부
function setHistoryDeleteButton(isVisible) {
  historyFooter.style.display = isVisible ? 'flex' : 'none';
}

// ──────────────────────────────
//  4. 이벤트 핸들링
// ──────────────────────────────

// 이벤트 리스너 등록
function initHistoryButtons() {
  const buttonMap = new Map([
    ['#history-open-btn', toggleHistory],
    ['#history-close-btn', toggleHistory],
    ['#history-delete-btn', openHistoryDeleteModal],
  ]);

  buttonMap.forEach((handler, selector) => {
    const button = document.querySelector(selector);
    if (button) button.addEventListener('click', handler);
  });
}

// ──────────────────────────────
//  5. 히스토리 초기화
// ──────────────────────────────

async function initHistory() {
  const data = await loadHistoryData();
  renderHistoryItems(data);
  initHistoryButtons();
}

export { initHistory, removeHistoryRecords };
