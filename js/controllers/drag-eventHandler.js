export default function initDragEvent() {
    const kanban = document.querySelector('.kanban');
    const body = document.querySelector('body');

    handleMousedown(kanban);
    handleMousemove(body);
    handleMouseup(body);
}

const dragManager = {    // 또는 cardDragger, dragController
    draggedCard: null,   // 드래그 중인 카드 요소
    isDragging: false,
    dragOffsetX: null,     // 드래그 시작 시의 X 오프셋
    dragOffsetY: null,     // 드래그 시작 시의 Y 오프셋

    initDraggedCard(e, rect) {
        this.draggedCard = document.querySelector('.card-clone');
        this.isDragging = true;
        this.dragOffsetX = e.clientX - rect.left;
        this.dragOffsetY = e.clientY - rect.top;
        this.updatePosition(e.clientX, e.clientY);
    },

    updatePosition(clientX, clientY) {
        this.draggedCard.style.left = `${clientX - this.dragOffsetX}px`;
        this.draggedCard.style.top = `${clientY - this.dragOffsetY}px`;
    },

    resetDraggedCard() {
        this.draggedCard.remove();
        this.draggedCard = null;
        this.isDragging = false;
        this.dragOffsetX = null;
        this.dragOffsetY = null;
    }
}

// let draggingData = {
//     colums,
//     columnCards,
//     dropZoneCoords,
//     cardPositions,
//     virtualCardPositions
// }

function handleMousedown(kanban) {
    kanban.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const card = e.target.closest('.card');
        if (!card) return;

        createCloneCard(card);
        dragManager.initDraggedCard(e, card.getBoundingClientRect());
    });
}

function handleMousemove(html) {
    html.addEventListener('mousemove', (e) => {
        if (!dragManager.isDragging) return;
        dragManager.updatePosition(e.clientX, e.clientY);
    })
}

function handleMouseup(html) {
    html.addEventListener('mouseup', () => {
        if (!dragManager.isDragging) return;
        dragManager.resetDraggedCard();
    });
}

function createCloneCard(card) {
    const cloneCard = card.cloneNode(true);
    cloneCard.classList.remove('card');
    cloneCard.classList.add('card-clone');
    document.querySelector('body').appendChild(cloneCard);
    return cloneCard;
}

// mousedown
// --- 필요 작업 ---
// 현재 시점 카드들의 위치 저장
// x1,x2,y1,y2 등 컬럼, 카드로 영역 나누기
// --- 완료 작업 ---
// 원본에 잔상효과 추가
// 복사본 생성
// 복사본 좌표 계산 및 업데이트

// mousemove
// --- 필요 작업 ---
// 현재 영역 확인
// 가상 돔을 이용해 잔상 옮기기
// 가상 돔의 카드들의 위치 저장
// 카드의 위치 차이 계산
// 계산 값 css로 적용 transform (0.3s)
// --- 완료 작업 ---
// 복사본 좌표 계산 및 업데이트

// mouseup
// --- 필요 작업 ---
// 가상 돔을 렌더링
// draggingData 초기화화
// --- 완료 작업 ---
// 복사본 제거
// 원본에 잔상효과 제거

// 변수 저장 관점에서
// mousedown 시 객체 생성
// 객체가 담을 정보
// { 컬럼배열, 컬럼별카드이차원배열, 영역좌표이차원배열, 카드위치이차원배열, 가상돔카드위치이차원배열2 }
// 해당 객체는 전역변수에 존재, mouseup 발생 시 initialize


//
//