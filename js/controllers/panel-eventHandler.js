import { openModal } from './modal-eventHandler.js';

function initHistoryPanel() {
    const panelContainer = document.querySelector('.history-panel__container');
    const panelToggleBtn = document.querySelector('.app-header__history-btn');

    bindPanelToggleButton(panelToggleBtn, panelContainer);
    delegatePanelEvents(panelContainer)
}

function bindPanelToggleButton(panelToggleBtn, panelContainer) {
    panelToggleBtn.addEventListener('click', () => togglePanel(panelContainer));
}

function delegatePanelEvents(panelContainer) {
    panelContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');

        if (btn === null) return;

        if (btn.classList.contains('history-panel__close-btn')) togglePanel(panelContainer);
        else if (btn.classList.contains('history-panel__footer-btn')) openModal('removeHistory');
    })
}

function togglePanel(panelContainer) {
    panelContainer.classList.toggle('history-panel--active');
}

export default initHistoryPanel;