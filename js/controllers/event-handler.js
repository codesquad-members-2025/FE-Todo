import KanbanStore from '../store/kanban-store.js';
import PanelStore from '../store/panel-store.js';
import { addLogEntry } from '../components/history-logger.js';

// export function initEventHandlers() {
//     initHistoryPanel();
//     initModal();
//     initKanban();
// }

// 히스토리 패널 이벤트
function initHistoryPanel() {
    const panelContainer = document.querySelector('.history-panel__container');
    const panelToggleBtn = document.querySelector('.app-header__history-btn');

    panelToggleBtn.addEventListener('click', () => {
        const historyPanel = panelContainer.querySelector('.history-panel');
        historyPanel.classList.toggle('history-panel--active');
    });
    
    panelContainer.addEventListener('click', e => {
        const btn = getClosestBtn(e.target);
        const historyPanel = panelContainer.querySelector('.history-panel');
        
        // 패널널에서 버튼이 아닌 영역 클릭 시 return
        if (btn === null) return;

        if (btn.classList.contains('history-panel')) historyPanel.classList.toggle('history-panel--active');
        else if (btn.classList.contains('history-panel__close-btn')) historyPanel.classList.toggle('history-panel--active');
        else if (btn.classList.contains('history-panel__footer-btn')) openModal('history');
    });
}

// 모달 이벤트
function initModal() {
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const confirmBtn = document.querySelector('.modal__confirm-btn');
    const modal = document.querySelector('.modal');

    // 모달 '취소' 버튼
    cancelBtn.addEventListener('click', modal.close.bind(modal));

    // 모달 '삭제' 버튼
    // 카드 삭제, 히스토리 삭제, 칼럼 삭제 등 분기 나눔
    confirmBtn.addEventListener('click', (e) => {
        const type = modal.dataset.type;

        if (type === 'history') {
            removeUserHistory();
        } else if (type === 'card') {
            KanbanStore.removeCard(modal.dataset.id);
        } else if (type === 'column') {
            KanbanStore.removeColumn(modal.dataset.id);
        }

        modal.dataset.id = null;
        modal.close();
    });
}

// 모달 관련 함수
function openModal(type, id = null) {
    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modal__text');

    const text = type === 'card' ? '선택한 카드를 삭제할까요?' :
        type === 'history' ? '모든 사용자 활동 기록을 삭제할까요?' :
            '선택한 칼럼을 삭제할까요?';

    modalText.innerText = text;
    modal.dataset.type = type;
    modal.dataset.id = id;

    modal.showModal();
}

// 사용자 활동 기록 삭제
function removeUserHistory() {
    PanelStore.removeAllLogEntry();
}

// 칸반 이벤트
function initKanban() {
    const kanban = document.querySelector('.kanban');

    kanban.addEventListener('click', e => {
        const btn = getClosestBtn(e.target);

        // 칸반에서 버튼이 아닌 영역 클릭 시 return
        if (btn === null) return;

        // 칼럼 헤더 버튼
        if (btn.classList.contains('column-header__add-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('column-header__close-btn')) removeColumn(btn);
        // 카드 폼 버튼
        else if (btn.classList.contains('card__cancel-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('card__submit-btn')) createCard(btn);
        // 카드 버튼
        else if (btn.classList.contains('card__close-btn')) openCardDeleteModal(btn);
        else if (btn.classList.contains('card__edit-btn'));
    });
}

// 일단 유틸리티 함수긴 함
function getCurColumn(e) {
    return e.closest('.column');
}

function getClosestBtn(e) {
    return e.closest('button');
}

function getCurColumnTitle(e) {
    return KanbanStore.getColumnTitle(getCurColumn(e).dataset.id);
}

// 카드 폼 토글
function toggleCardForm(btn) {
    const cardForm = getCurColumn(btn).querySelector('.card-form');
    cardForm.classList.toggle('hidden');
}

// 카드 생성
function createCard(btn) {
    const cardForm = btn.closest('.card-form');
    const curColumn = getCurColumn(btn);

    const titleArea = cardForm.querySelector('.card__title-input');
    const textArea = cardForm.querySelector('.card__body-input');

    const { value: titleInput } = titleArea;
    const { value: textInput } = textArea;

    const cardData = {
        id: getRandomId(),
        title: titleInput,
        description: textInput,
        author: 'web'
    }

    titleArea.value = '';
    textArea.value = '';

    KanbanStore.addCard(getCurColumn(btn).dataset.id, cardData);
    toggleCardForm(btn);

    // 사용자 활동 기록에 historyLogEntry 추가
    const logData = {
        cardTitle: titleInput,
        columnTitle: getCurColumnTitle(btn)
    }

    addLogEntry('add', logData);
}

// 카드 삭제
function openCardDeleteModal(btn) {
    const card = btn.closest('.card');
    openModal('card', card.dataset.id);

    // 사용자 활동 기록에 historyLogEntry 추가
    const logData = {
        cardTitle: card.querySelector('.card__title').textContent,
        columnTitle: getCurColumnTitle(btn)
    }

    addLogEntry('remove', logData);
}

// 칼럼 삭제
function removeColumn(btn) {
    const column = btn.closest('.column');
    openModal('column', column.dataset.id);
}

// 랜덤 아이디 부여
function getRandomId() {
    return Math.floor(Math.random() * 100000);
}

export { initKanban };