import { pushChild } from '../shared/utils/dom.js';
import { createActivityRecord } from './template.js';

// 캐싱된 DOM 요소
const activityContainer = document.getElementById('activity-list-container');
const activityDefault = document.getElementById('activity-empty-state');
const activityFooter = document.getElementById('activity-panel-footer');
const activityPanel = document.getElementById('activity-panel');

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

// UI 상태 관리 함수들
function setActivityVisibility(isVisible) {
  activityPanel.style.display = isVisible ? 'flex' : 'none';
}

function setActivityDefaultUI(isVisible) {
  activityDefault.style.display = isVisible ? 'flex' : 'none';
}

function setActivityDeleteButton(isVisible) {
  activityFooter.style.display = isVisible ? 'flex' : 'none';
}

// 기록 삭제
function removeActivityRecords() {
  activityContainer.innerHTML = '';
  setActivityDefaultUI(true);
  setActivityDeleteButton(false);
}

export {
  renderActivityRecords,
  setActivityVisibility,
  setActivityDefaultUI,
  setActivityDeleteButton,
  removeActivityRecords,
};
