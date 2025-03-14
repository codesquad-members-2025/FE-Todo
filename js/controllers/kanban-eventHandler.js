import KanbanStore from '../store/kanban-store.js';
import { openModal } from './modal-eventHandler.js';
import createLogEntry from '../components/history-logger.js';

function initKanban() {
    const kanban = document.querySelector('.kanban');

    delegateKanbanEvents(kanban);
}

function delegateKanbanEvents(kanban) {
    kanban.addEventListener('click', (e) => {
        const btn = e.target.closest('button');

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
    })
}

// 유틸리티 함수
function getCurColumn(e) {
    return e.closest('.column');
}

// 유틸리티 함수
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
    const newCardData =  getCardData(cardForm);
    // 스토어에 카드 생성, 매개변수로 (칼럼ID, 카드데이터) 전달
    KanbanStore.addCard(getCurColumn(btn).dataset.id, newCardData);
    // 카드 폼 토글
    toggleCardForm(btn);
    // 히스토리 패널에 생성 로그 추가
    const logEntryIds = {
        cardId: newCardData.id,
        columnId: getCurColumn(btn).dataset.id
    }
    createLogEntry('addCard', logEntryIds);
    // 카드 폼 input 삭제
    removeCardFormInput(cardForm);
}

// 카드 데이터 생성
function getCardData(cardForm) {
    const titleArea = cardForm.querySelector('.card__title-input');
    const textArea = cardForm.querySelector('.card__body-input');
    
    const { value: titleInput } = titleArea;
    const { value: textInput } = textArea;
    
    return {
        id: getRandomId(),
        title: titleInput,
        description: textInput,
        author: 'web'
    }
}

// 카드 폼 입력값 삭제
function removeCardFormInput(cardForm) {
    titleArea.value = '';
    textArea.value = '';
}

// 카드 삭제
function openCardDeleteModal(btn) {
    const card = btn.closest('.card');
    openModal('removeCard', { cardId: card.dataset.id });
    // logEntry 생성은 modal에서
}

// 칼럼 삭제
function removeColumn(btn) {
    const column = btn.closest('.column');
    openModal('removeColumn', { columnId: column.dataset.id });
    // logEntry 생성은 modal에서
}

// 랜덤 아이디 부여
function getRandomId() {
    return Math.floor(Math.random() * 100000);
}

export default initKanban;