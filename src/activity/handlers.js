import { setElementVisibility } from './renderer.js';
import { setConfirmDialog } from '../shared/components/dialog/index.js';
import { removeActivityRecords, toggleDefaultUi } from './renderer.js';
import { clearActivityData } from '../activity/store.js';

// 이벤트 리스너 등록
function initActivityHandlers() {
  const buttonMap = {
    '#activity-panel-open-btn': toggleActivityPanel,
    '#activity-panel-close-btn': toggleActivityPanel,
    '#activity-clear-btn': openActivityDeleteDialog,
  };

  Object.keys(buttonMap).forEach((selector) => {
    document
      .querySelector(selector)
      ?.addEventListener('click', buttonMap[selector]);
  });
}

// 활동기록 삭제 모달 오픈
function openActivityDeleteDialog() {
  setConfirmDialog('모든 사용자 활동 기록을 삭제할까요?', () => {
    removeActivityRecords();
    clearActivityData();
    toggleDefaultUi(true);
  });
}

// 활동 패널 토글
function toggleActivityPanel() {
  const activityPanel = document.getElementById('activity-panel');
  const isPanelVisible = activityPanel.style.display !== 'flex';
  setElementVisibility(activityPanel, isPanelVisible);
}

function parseContent(task, action, details = {}) {
  const actionMap = {
    move: '이동',
    add: '등록',
    remove: '삭제',
    update: '변경',
  };

  const taskText = `<span class="tx-b14 text-bold">${task}</span>을(를) `;
  const actionText = `<span class="tx-b14 text-bold">${actionMap[action]}</span>하였습니다.`;

  const contentMap = {
    add: `<span class="tx-b14 text-bold">${details?.column}</span>에서`,
    remove: `<span class="tx-b14 text-bold">${details?.column}</span>에서`,
    update: '',
    move: `<span class="tx-b14 text-bold">${details?.from}</span>에서 
           <span class="tx-b14 text-bold">${details?.to}</span>으로`,
  };

  return `${taskText}${contentMap[action]} ${actionText}`;
}

export { initActivityHandlers, parseContent };
