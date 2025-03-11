import { createCardNode } from './template.js';

export function initEventHandlers() {
    initHistoryPanel();
    initModal();
    initKanbanHandlers();
}

// 히스토리 패널 이벤트
function initHistoryPanel() {
    const historyPanel = document.querySelector('.history-panel');
    const panelToggleBtn = document.querySelector('.app-header__history-btn');
    const panelCloseBtn = document.querySelector('.history-panel__close-btn');
    const historyRemoveBtn = document.querySelector('.history-panel__footer-btn');

    panelToggleBtn.addEventListener('click', () => {
        historyPanel.classList.toggle('history-panel--active');
    });

    panelCloseBtn.addEventListener('click', () => {
        historyPanel.classList.toggle('history-panel--active');
    });

    historyRemoveBtn.addEventListener('click', () => {
        openModal('history');
    });
}

// 모달 이벤트
function initModal() {
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const confirmBtn = document.querySelector('.modal__confirm-btn');
    const modal = document.querySelector('.modal');

    cancelBtn.addEventListener('click', () => modal.close());

    confirmBtn.addEventListener('click', () => {
        if (modal.dataset.type === 'history') {
            removeUserHistory();
        } else {
            document.querySelector(`[data-id="${modal.dataset.cardId}"]`).remove();
            modal.dataset.cardId = null;
        }

        modal.close();
    });
}

// 모달 관련 함수
function openModal(type, id = null) {
    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modal__text');

    const text = type === 'card' ? '선택한 카드를 삭제할까요?' : '모든 사용자 활동 기록을 삭제할까요?';

    modalText.innerText = text;
    modal.dataset.type = type;
    modal.dataset.cardId = id;

    modal.showModal();
}

// 사용자 활동 기록 삭제
function removeUserHistory() {
    const empty = document.querySelector('.history-panel__empty');
    const item = document.querySelector('.history-panel__item');
    const footer = document.querySelector('.history-panel__footer');

    empty.style.display = 'flex';
    item.style.display = 'none';
    footer.style.display = 'none';
    item.innerHTML = "";
}

// 칸반 이벤트
function initKanbanHandlers() {
    const kanban = document.querySelector('.kanban');

    kanban.addEventListener('click', e => {
        const btn = e.target.closest('button');

        // 칸반에서 버튼이 아닌 영역 클릭 시 return
        if (btn === null) return;
        
        // 컬럼 헤더 버튼
        if (btn.classList.contains('column-header__add-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('column-header__close-btn'));
        // 카드 폼 버튼
        else if (btn.classList.contains('card__cancel-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('card__submit-btn')) createCard(btn);
        // 카드 버튼
        else if (btn.classList.contains('card__close-btn')) removeCard(btn);
        else if (btn.classList.contains('card__edit-btn'));
    });
}

// 일단 유틸리티 함수긴 함
function getCurColumn(e) {
    return e.closest('.column');
}

// 첫번째 카드 앞 노드 삽입
function insertNode(node, column) {
    const firstCard = column.querySelector('.card');
    column.insertBefore(node, firstCard);
}

// 카드 폼 토글
function toggleCardForm(btn) {
    const cardForm = getCurColumn(btn).querySelector('.card-form');
    cardForm.classList.toggle('hidden');
}

// 카드 생성
function createCard(btn) {
    const cardForm = btn.closest('.card-form')

    const titleInput = cardForm.querySelector('.card__title-input').value;
    const bodyInput = cardForm.querySelector('.card__body-input').value;

    insertNode(createCardNode(titleInput, bodyInput), getCurColumn(btn));
    toggleCardForm(btn);
}

// 카드 삭제
function removeCard(btn) {
    const card = btn.closest('.card');

    openModal('card', card.dataset.id);
}