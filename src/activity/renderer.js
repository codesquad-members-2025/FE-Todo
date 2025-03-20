import { getFragment } from '../shared/utils/dom.js';
import { getTimeAgo } from '../shared/utils/common.js';
import { parseContent } from './handlers.js';
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
    toggleDefaultUi(true);
    return;
  }

  removeActivityRecords();

  const fragment = activityListData.reduce(
    (frag, { task, username, profileImage, timeStamp, action, details }) => {
      const parsedContent = parseContent(task, action, details);
      const timeAgo = getTimeAgo(timeStamp);

      frag.appendChild(
        createActivityRecord(username, profileImage, parsedContent, timeAgo)
      );

      return frag;
    },
    getFragment()
  );

  activityContainer.appendChild(fragment);
  toggleDefaultUi(false);
}

function setElementVisibility(targetElement, isVisible) {
  targetElement.style.display = isVisible ? 'flex' : 'none';
}

// 기록 삭제
function removeActivityRecords() {
  activityContainer.innerHTML = ''; // 기존 기록 삭제
}

function toggleDefaultUi(isShow) {
  setElementVisibility(activityDefault, isShow); // 기본 화면 보이기
  setElementVisibility(activityFooter, !isShow); // 푸터 숨기기
}

export {
  renderActivityRecords,
  setElementVisibility,
  removeActivityRecords,
  toggleDefaultUi,
};
