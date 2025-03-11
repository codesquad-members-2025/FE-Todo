import { createCardFormNode, createCardNode } from './template.js';

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


    cancelBtn.addEventListener('click', e => {
        modal.close();
    });

    confirmBtn.addEventListener('click', e => {
        const id = modal.dataset.id;

        if (id === 'null') {
            removeUserHistory();
        } else {
            modal.dataset.id = null;
            document.querySelector('.kanban').querySelector(`[data-id="${id}"]`).remove();
        }

        modal.close();
    });
}

// 모달 관련 함수
function openModal(modalType, id = null) {
    const modal = document.querySelector('.modal');

    if (modalType = 'card') {
        modal.querySelector('.modal__text').innerText = '선택한 카드를 삭제할까요?';
    } else if (modalType = 'history') {
        modal.querySelector('.modal__text').innerText = '모든 사용자 활동 기록을 삭제할까요?';
    }
    
    modal.dataset.id = id;
    modal.showModal();
}

// 사용자 활동 기록 삭제
function removeUserHistory() {
    const empty = document.querySelector('.history-panel__empty');
    const item = document.querySelector('.history-panel__item');

    empty.style.display = 'flex';
    item.style.display = 'none';
    item.innerHTML = "";
}

// 칸반 이벤트
function initKanbanHandlers() {
    const kanban = document.querySelector('.kanban');

    kanban.addEventListener('click', e => {
        const btn = getClosestBtn(e.target);

        if (btn === null) return;

        if (btn.classList.contains('column-header__add-btn')) {
            // '카드 폼 생성or삭제 로직 실행'
            toggleCardForm(btn);
        } else if (btn.classList.contains('column-header__close-btn')) {
            // '컬럼 삭제 로직 실행'
        } else if (btn.classList.contains('card__cancel-btn')) {
            toggleCardForm(btn);
            // '카드 폼 삭제 로직 실행'
        } else if (btn.classList.contains('card__submit-btn')) {
            // '카드 생성 로직 실행'
            createCard(btn);
        } else if (btn.classList.contains('card__close-btn')) {
            // '카드 삭제 로직 실행'
            removeCard(btn);
        } else if (btn.classList.contains('card__edit-btn')) {
            // '카드 수정 로직 실행'
        }
    });
}

function getCurColumn(e) {
    return e.closest('.column');
}

function getClosestBtn(e) {
    return e.tagName === 'button' ? e : e.closest('button');
}

// 첫번째 카드 앞 노드 삽입
function insertNode(node, column) {
    const firstCard = column.querySelector('.card');
    column.insertBefore(node, firstCard);
}

// 카드 폼 생성or삭제
function toggleCardForm(btn) {
    const curColumn = getCurColumn(btn);

    const cardForm = curColumn.querySelector('.card-form');
    if (cardForm) {
        cardForm.remove();
    } else {
        insertNode(createCardFormNode(), curColumn)
    }
}

// 카드 생성
function createCard(btn) {
    const cardForm = btn.closest('.card-form')

    const titleInput = cardForm.querySelector('.card__title-input').value;
    const bodyInput = cardForm.querySelector('.card__body-input').value;

    const cardNode =  createCardNode(titleInput, bodyInput);
    insertNode(cardNode, getCurColumn(btn));
    cardForm.remove();
}

// 카드 삭제
function removeCard(btn) {
    const card = btn.closest('.card');

    openModal('card', card.dataset.id);
}