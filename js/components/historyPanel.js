export function initHistoryPanel() {
    const historyPanelBtn = document.querySelector('.app-header__history-btn');

    historyPanelBtn.addEventListener('click', (event) => {
        const historyPanel = document.querySelector('.history-panel');
        historyPanel.classList.toggle('history-panel--active');
    });
}
