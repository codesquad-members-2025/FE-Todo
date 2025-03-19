import KanbanStore from '../store/kanban-store.js';
import { openModal } from './modal-eventHandler.js';
import createLogEntry from '../components/history-logger.js';
import { getRandomId } from '../utils/index.js'

function initKanban() {
    const kanban = document.querySelector('.kanban');
    handleKanbanEvents(kanban);
}

function handleKanbanEvents(kanban) {
    kanban.addEventListener('click', (e) => {
        const btn = e.target.closest('button');

        if (btn === null) return;

        // 칼럼 헤더 버튼
        if (btn.classList.contains('column-header__add-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('column-header__close-btn')) removeColumn(btn);
        // 카드 폼 버튼
        else if (btn.classList.contains('card__cancel-btn')) toggleCardForm(btn);
        else if (btn.classList.contains('card__submit-btn')) {
            createCard(btn);
            toggleCardForm(btn);
        }
        // 카드 버튼
        else if (btn.classList.contains('card__close-btn')) openCardDeleteModal(btn);
    })
}

// 카드 폼 토글
function toggleCardForm(btn) {
    const cardForm = getCurColumn(btn).querySelector('.card-form');
    cardForm.classList.toggle('hidden');
}

// 카드 생성
function createCard(btn) {
    const cardForm = btn.closest('.card-form');
    const newCardData = getCardData(cardForm);
    
    // 스토어에 카드 생성, 매개변수로 (칼럼ID, 카드데이터) 전달
    KanbanStore.addCard(getCurColumn(btn).dataset.id, newCardData);
    
    // 히스토리 패널에 "카드 생성" 로그 추가
    createLogEntry({
        type: 'cardAdd',
        cardId: newCardData.id,
        columnId: getCurColumn(btn).dataset.id
    });
}

// 카드 삭제
function openCardDeleteModal(btn) {
    const card = btn.closest('.card');
    openModal({
        type: 'cardRemove',
        cardId: card.dataset.id,
        columnId: getCurColumn(btn).dataset.id
    });
    // createLogEntry 호출은 modal-evnetHandler에서 comfirm 버튼 클릭 시 호츌
}

// 칼럼 삭제
function removeColumn(btn) {
    const column = btn.closest('.column');
    openModal({
        type: 'columnRemove',
        columnId: column.dataset.id
    });
    // createLogEntry 호출은 modal-evnetHandler에서 comfirm 버튼 클릭 시 호출
}

// createCard의 헬퍼함수
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

// 칸반 핸들러의 작은 유틸함수들
function getCurColumn(e) {
    return e.closest('.column');
}

export default initKanban;