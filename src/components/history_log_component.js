export const historyLogComponent = ({ message, timestamp }) => {
  return `
  <div class="history-modal__content-item flex">
    <div class="history-modal__content-item-left flex-center">
      <img
        class="history-modal__content-item-left-icon"
        src="./images/action_icon.png"
        width="40px"
        alt="사용자 액션 아이콘"
      />
    </div>
    <div class="history-modal__content-item-right flex flex-column flex-justify-space-between">
      <p class="action-user-name">@SangYoonLee</p>
      <p class="action-description">
        ${message}
      </p>
      <p class="action-time">${timestamp}</p>
    </div>
  </div>`;
};
