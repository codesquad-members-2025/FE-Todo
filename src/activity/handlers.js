import { setActivityVisibility } from './renderer.js';
import { setConfirmDialog } from '../shared/components/dialog/index.js';
import { removeActivityRecords } from './renderer.js';

// 이벤트 리스너 등록
function initActivityHandlers() {
  const buttonMap = new Map([
    ['#activity-panel-open-btn', toggleActivityPanel],
    ['#activity-panel-close-btn', toggleActivityPanel],
    ['#activity-clear-btn', openActivityDeleteDialog],
  ]);

  buttonMap.forEach((handler, selector) => {
    const button = document.querySelector(selector);
    if (button) button.addEventListener('click', handler);
  });
}

// 활동기록 삭제 모달 오픈
function openActivityDeleteDialog() {
  setConfirmDialog(
    '모든 사용자 활동 기록을 삭제할까요?',
    removeActivityRecords
  );
}

// 활동 패널 토글
function toggleActivityPanel() {
  const activityPanel = document.getElementById('activity-panel');
  setActivityVisibility(activityPanel.style.display !== 'flex');
}

export { initActivityHandlers };
