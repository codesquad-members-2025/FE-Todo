import { getFragment } from '../shared/utils/dom.js';
import { createActivityRecord } from './template.js';

// 캐싱된 DOM 요소
const activityPanel = document.getElementById('activity-panel');
const activityContainer = activityPanel.querySelector(
  '#activity-list-container'
);
const activityDefault = activityPanel.querySelector('#activity-empty-state');
const activityFooter = activityPanel.querySelector('footer');

// 기록 렌더링
function renderActivityRecords(activityListData) {
  if (activityListData.length === 0) {
    setActivityDefaultUI(true);
    return;
  }

  const fragment = activityListData.reduce(
    (frag, { username, profileImage, actionText, timestamp }) => {
      frag.appendChild(
        createActivityRecord(username, profileImage, actionText, timestamp)
      );

      return frag;
    },
    getFragment()
  );

  // pushChild(activityContainer, activityRecordsHtml);
  activityContainer.appendChild(fragment);
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
