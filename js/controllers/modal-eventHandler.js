import KanbanStore from '../store/kanban-store.js';
import PanelStore from '../store/panel-store.js';
import createLogEntry from '../components/history-logger.js';

function initModal() {
    const modal = document.querySelector('.modal');
    const modalCancelBtn = modal.querySelector('.modal__cancel-btn');
    const modalConfirmBtn = modal.querySelector('.modal__confirm-btn');

    bindModalCancelButton(modal, modalCancelBtn);
    bindModalConfirmButton(modal, modalConfirmBtn);
}

function bindModalCancelButton(modal, modalCancelBtn) {
    modalCancelBtn.addEventListener('click', () => modal.close());
}

function bindModalConfirmButton(modal, modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
        const cardId = modal.dataset.cardId;
        const columnId = modal.dataset.columnId;
        const type = modal.dataset.type;
        
        // 스토어 갱신하기 전에 logEntry 생성
        // 스토어 갱신이 먼저되면 LogEntry 생성 시 스토어에서 정보를 찾을 수 없음
        const ids = {
            cardId: cardId,
            columnId: columnId
        }
        if (type !== 'removeHistory') {
            console.log('create logEntry type: ' + type)
            createLogEntry(type, ids);
        }

        // 분기 처리
        if (type === 'removeCard') KanbanStore.removeCard(cardId);
        else if (type === 'removeColumn') KanbanStore.removeColumn(columnId);
        else if (type === 'removeHistory') PanelStore.removeAllLogEntry();

        modal.close();
    });
}

function configModal(type, { cardId = null, columnId = null }) {
    console.log(type)
    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modal__text');

    let text = '';
    if (type === 'removeCard') text = '선택한 카드를 삭제할까요?';
    else if (type === 'removeColumn') text = '선택한 칼럼을 삭제할까요?';
    else if (type === 'removeHistory') text = '모든 사용자 활동 기록을 삭제할까요?';

    modal.dataset.cardId = cardId;
    modal.dataset.columnId = columnId;
    modal.dataset.type = type;
    modalText.innerText = text;
}

function openModal(type, { cardId = null, columnId = null }) {
    const modal = document.querySelector('.modal');
    configModal(type, { cardId, columnId });
    modal.showModal();
}

export { initModal, openModal };