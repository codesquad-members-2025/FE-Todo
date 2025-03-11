export function initEventHandlers() {
    const kanban = document.querySelector('.kanban');

    initColumnHeaderHandlers(kanban);
    initCardFormHandlers(kanban);
    initCardActionHandlers(kanban);
}

// 컬럼 헤더 이벤트 핸들러 (카드 폼 생성, 컬럼 삭제)
// 카드 폼 이벤트 핸들러 (취소, 확인)
// 카드 이벤트 핸들러 (삭제, 수정)


// 컬럼 헤더 이벤트 (카드 폼 생성, 컬럼 삭제)
function initColumnHeaderHandlers(kanban) {
    // 카드 폼 생성
    kanban.addEventListener('click', e => {
        console.log(getClosestBtn(e.target));
            
    });
}

// 카드 폼 이벤트 (취소, 확인)
function initCardFormHandlers() {
    // ...
}

// 카드 이벤트 (삭제, 수정)
function initCardActionHandlers() {
    // ...
}

function getClosestBtn(e) {
    return e.closest('button');
}