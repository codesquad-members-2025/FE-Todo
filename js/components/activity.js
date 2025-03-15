import { createActivityRecord } from './template.js';
import { pushChild } from '../utils/dom.js';
import { openActivityDeleteModal } from './modal.js';
import { loadActivityData } from '../../store/activity.js';

// ──────────────────────────────
//  1. 캐싱된 DOM 요소(동적이 요소가 아닌 DOM 요소)
// ──────────────────────────────
const activityContainer = document.getElementById('activity-list-container');
const activityDefault = document.getElementById('activity-empty-state');
const activityFooter = document.getElementById('activity-panel-footer');
const activityPanel = document.getElementById('activity-panel');

// ──────────────────────────────
//  2. 기록 렌더링 및 삭제
// ──────────────────────────────

// 기록 렌더링
function renderActivityRecords(activityListData) {
  if (activityListData.length === 0) {
    setActivityDefaultUI(true);
    return;
  }

  const activityRecordsHtml = activityListData.reduce(
    (recordsHtml, { username, profileImage, actionText, timestamp }) => {
      return (
        recordsHtml +
        createActivityRecord(username, profileImage, actionText, timestamp)
      );
    },
    ''
  );

  pushChild(activityContainer, activityRecordsHtml);
  setActivityDeleteButton(true);
}

// 기록 삭제
function removeActivityRecords() {
  activityContainer.innerHTML = '';
  setActivityDefaultUI(true);
  setActivityDeleteButton(false);
}

// ──────────────────────────────
//  3. UI 토글 함수
// ──────────────────────────────

// 히스토리 열기/닫기
function toggleActivityPanel() {
  setActivityVisibility(activityPanel.style.display !== 'flex');
}

// 히스토리 표시 여부 설정
function setActivityVisibility(isVisible) {
  activityPanel.style.display = isVisible ? 'flex' : 'none';
}

// 기본 UI 표시 여부
function setActivityDefaultUI(isVisible) {
  activityDefault.style.display = isVisible ? 'flex' : 'none';
}

// 기록 삭제 버튼 표시 여부
function setActivityDeleteButton(isVisible) {
  activityFooter.style.display = isVisible ? 'flex' : 'none';
}

// ──────────────────────────────
//  4. 이벤트 핸들링
// ──────────────────────────────

// 이벤트 리스너 등록
function initActivityPanelButtons() {
  const buttonMap = new Map([
    ['#activity-panel-open-btn', toggleActivityPanel],
    ['#activity-panel-close-btn', toggleActivityPanel],
    ['#activity-clear-btn', openActivityDeleteModal],
  ]);

  buttonMap.forEach((handler, selector) => {
    const button = document.querySelector(selector);
    if (button) button.addEventListener('click', handler);
  });
}

// ──────────────────────────────
//  5. 히스토리 초기화
// ──────────────────────────────

async function initActivityPanel() {
  const data = await loadActivityData();
  renderActivityRecords(data);
  initActivityPanelButtons();
}

export { initActivityPanel, removeActivityRecords };
