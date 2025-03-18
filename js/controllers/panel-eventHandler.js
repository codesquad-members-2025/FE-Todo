import { openModal } from './modal-eventHandler.js';

function initHistoryPanel() {
    const panelContainer = document.querySelector('.history-panel__container');
    const panelToggleBtn = document.querySelector('.app-header__history-btn');

    handlePanelToggleBtn(panelToggleBtn, panelContainer);
    handlePanelEvents(panelContainer)
}

function handlePanelToggleBtn(panelToggleBtn, panelContainer) {
    panelToggleBtn.addEventListener('click', () => togglePanel(panelContainer));
}

function handlePanelEvents(panelContainer) {
    panelContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');

        if (btn === null) return;

        if (btn.classList.contains('history-panel__close-btn')) togglePanel(panelContainer);
        else if (btn.classList.contains('history-panel__footer-btn')) openModal({ type: 'historyRemove' });
    })
}

function togglePanel(panelContainer) {
    panelContainer.classList.toggle('history-panel--active');
}

export default initHistoryPanel;