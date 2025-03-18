import KanbanStore from '../store/kanban-store.js';
import PanelStore from '../store/panel-store.js';
import createLogEntry from '../components/history-logger.js';

function initModal() {
    const modal = document.querySelector('.modal');
    const modalCancelBtn = modal.querySelector('.modal__cancel-btn');
    const modalConfirmBtn = modal.querySelector('.modal__confirm-btn');

    handleModalCancelBtn(modal, modalCancelBtn);
    handleModalConfirmBtn(modal, modalConfirmBtn);
}

function handleModalCancelBtn(modal, modalCancelBtn) {
    modalCancelBtn.addEventListener('click', () => modal.close());
}

function handleModalConfirmBtn(modal, modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => { 
        const actionType = modal.dataset.type;
        const cardId = modal.dataset.cardId;
        const columnId = modal.dataset.columnId;

        // 스토어에서 제거 전에 logEntry 생성
        if (actionType !== 'historyRemove') createLogEntry({ actionType, cardId, columnId });

        // 스토어에서 제거
        if (actionType === 'cardRemove') KanbanStore.removeCard(cardId);
        else if (actionType === 'columnRemove') KanbanStore.removeColumn(columnId);
        else if (actionType === 'historyRemove') PanelStore.removeAllLogEntry();

        modal.close();
    });
}

function configModal({ type: textType, cardId = '', columnId = '' }) {
    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modal__text');

    let text = '';
    if (textType === 'cardRemove') text = '선택한 카드를 삭제할까요?';
    else if (textType === 'columnRemove') text = '선택한 컬럼을 삭제할까요?';
    else if (textType === 'historyRemove') text = '모든 사용자 활동 기록을 삭제할까요?';

    modal.dataset.cardId = cardId;
    modal.dataset.columnId = columnId;
    modal.dataset.type = textType;
    modalText.innerText = text;
}

function openModal({ type, cardId = '', columnId = '' }) {
    const modal = document.querySelector('.modal');
    configModal({ type, cardId, columnId });
    modal.showModal();
}

export { initModal, openModal };