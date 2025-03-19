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
    setElementVisivility(activityDefault, true);

    return;
  }

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
  setElementVisivility(activityFooter, true);
}

function setElementVisivility(targetElement, isVisible) {
  targetElement.style.display = isVisible ? 'flex' : 'none';
}

// 기록 삭제
function removeActivityRecords() {
  activityContainer.innerHTML = '';
  setElementVisivility(activityDefault, true);
  setElementVisivility(activityFooter, false);
}

export { renderActivityRecords, setElementVisivility, removeActivityRecords };
