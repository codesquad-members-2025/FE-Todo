export function initEventHandlers() {
    const kanban = document.querySelector('.kanban');

    initHistoryPanel();
    initColumnHeaderHandlers(kanban);
    initCardFormHandlers(kanban);
    initCardActionHandlers(kanban);
}

// 히스토리 패널 이벤트
function initHistoryPanel() {
    const historyPanelBtn = document.querySelector('.app-header__history-btn');

    historyPanelBtn.addEventListener('click', () => {
        const historyPanel = document.querySelector('.history-panel');
        historyPanel.classList.toggle('history-panel--active');
    });
}

// 컬럼 헤더 이벤트 (카드 폼 생성, 컬럼 삭제)
function initColumnHeaderHandlers(kanban) {
    kanban.addEventListener('click', e => {
        const btn = getClosestBtn(e.target);

        if (btn === null) return;

        if (btn.classList.contains('column-header__add-btn')) {
            console.log('카드 폼 생성or삭제 로직 실행');
        } else if (btn.classList.contains('column-header__close-btn')) {
            console.log('컬럼 삭제 로직 실행');
        }
    });
}

// 카드 폼 이벤트 (취소, 확인)
function initCardFormHandlers(kanban) {
    kanban.addEventListener('click', e =>{
        const btn = getClosestBtn(e.target);

        if (btn === null) return;

        if (btn.classList.contains('card__cancel-btn')) {
            console.log('카드 폼 삭제 로직 실행');
        } else if (btn.classList.contains('card__submit-btn')) {
            console.log('카드 생성 로직 실행');
        }
    });
}

// 카드 이벤트 (삭제, 수정)
function initCardActionHandlers(kanban) {
    kanban.addEventListener('click', e =>{
        const btn = getClosestBtn(e.target);

        if (btn === null) return;

        if (btn.classList.contains('card__close-btn')) {
            console.log('카드 삭제 로직 실행');
        } else if (btn.classList.contains('card__edit-btn')) {
            console.log('카드 수정 로직 실행');
        }
    });
}

function getClosestBtn(e) {
    if (e.tagName === 'button') return e;
    else return e.closest('button');
}