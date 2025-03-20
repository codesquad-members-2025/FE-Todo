import KanbanStore from '../store/kanban-store.js';
import { createKanbanVirtualDOM } from '../components/kanban-renderer.js';

export default function initDragEvent() {
    const kanban = document.querySelector('.kanban');
    const body = document.querySelector('body');

    handleMousedown(kanban);
    handleMousemove(body);
    handleMouseup(body);
}

// 개별 상수 선언
const COLUMN_GAP = 24;  // px
const CARD_GAP = 10;   // px

const dragManager = {    // 또는 cardDragger, dragController
    draggedCard: null,   // 드래그 중인 카드 요소
    isDragging: false,
    dragOffsetX: null,     // 드래그 시작 시의 X 오프셋
    dragOffsetY: null,     // 드래그 시작 시의 Y 오프셋

    initializeDrag(e, rect) {
        this.draggedCard = document.querySelector('.card-clone');
        this.isDragging = true;
        this.dragOffsetX = e.clientX - rect.left;
        this.dragOffsetY = e.clientY - rect.top;
        this.updateDragPosition(e.clientX, e.clientY);
    },

    updateDragPosition(clientX, clientY) {
        this.draggedCard.style.left = `${clientX - this.dragOffsetX}px`;
        this.draggedCard.style.top = `${clientY - this.dragOffsetY}px`;
    },

    resetDragState() {
        this.draggedCard.remove();
        this.draggedCard = null;
        this.isDragging = false;
        this.dragOffsetX = null;
        this.dragOffsetY = null;
    }
}

const dragLayoutState = {
    virtualDOM: null,
    columnElements: null,
    cardMatrix: null,
    columnBoundaries: null,
    cardBoundaries: null,

    initialize() {
        this.virtualDOM = createVirtualDOMFromStore();
        this.columnElements = getColumnElements(this.virtualDOM);
        this.cardMatrix = getColumnCardMatrix(this.virtualDOM);
        this.columnBoundaries = getColumnBoundaries(this.columnElements);
        this.cardBoundaries = getCardBoundaryMatrix(this.cardMatrix);
    },

    reset() {
        this.virtualDOM = null;
        this.columnElements = null;
        this.cardMatrix = null;
        this.columnBoundaries = null;
        this.cardBoundaries = null;
    }
}

function handleMousedown(kanban) {
    kanban.addEventListener('dragstart', (e) => {
        e.preventDefault();
        const card = e.target.closest('.card');
        if (!card) return;

        createCloneCard(card);
        dragManager.initializeDrag(e, card.getBoundingClientRect());
        dragLayoutState.initialize();
    });
}

function handleMousemove(html) {
    html.addEventListener('mousemove', (e) => {
        if (!dragManager.isDragging) return;
        dragManager.updateDragPosition(e.clientX, e.clientY);
    })
}

function handleMouseup(html) {
    html.addEventListener('mouseup', () => {
        if (!dragManager.isDragging) return;
        dragManager.resetDragState();
    });
}

function createCloneCard(card) {
    const cloneCard = card.cloneNode(true);
    cloneCard.classList.remove('card');
    cloneCard.classList.add('card-clone');
    document.querySelector('body').appendChild(cloneCard);
    return cloneCard;
}

function createVirtualDOMFromStore() {
    const kanbanData = KanbanStore.getData();
    return createKanbanVirtualDOM(kanbanData);
}

function getColumnElements(virtualDOM) {
    return [...virtualDOM.querySelectorAll('.column')];
}

function getColumnCardMatrix(virtualDOM) {
    const columns = [...virtualDOM.querySelectorAll('.column')];
    return columns.reduce((cardMatrix, column, idx) => {  // 2차원 카드 배열
        cardMatrix[idx] = [...column.querySelectorAll('.card')];
        return cardMatrix;
    }, []);
}

function getColumnBoundaries(columns) {
    return columns.reduce((boundaries, column) => {  // 경계선 좌표 배열
        const rect = column.getBoundingClientRect();
        boundaries.push(rect.left + rect.width + COLUMN_GAP / 2);
        return boundaries;
    }, []); 
}

function getCardBoundaryMatrix(cardMatrix) {
    return cardMatrix.reduce((boundaryMatrix, cards) => {  // 2차원 경계선 배열
        boundaryMatrix.push(getCardBoundaries(cards));
        return boundaryMatrix;
    }, []);
}

function getCardBoundaries(cards) {
    return cards.reduce((boundaries, card) => {  // 경계선 좌표 배열
        const rect = card.getBoundingClientRect();
        boundaries.push(rect.top + rect.height + CARD_GAP / 2);
        return boundaries;
    }, []);
}

// 모듈스코프 전역변수
// dragManager

// dragLayoutManager

// mousedown
// --- 필요 작업 ---
// --- 완료 작업 ---
// 현재 시점 카드들의 위치 저장
// x1,x2,y1,y2 등 컬럼, 카드로 영역 나누기
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
// 해당 객체는 전역변수에 존재, mouseup 발생 시 reset


//
/*

컬럼배열 [column1, column2, column3]
컬럼별카드배열 [
    [card1, card2, card3],
    [card4, card5],
    []
]
// 컬럼을 돌면서 첫번째 컬럼부터의 rect.left + rect.width + COLUMN_GAP / 2 가 x1, x2,... 가 됨
// 카드배열을 돌면서 첫번째 카드부터의 rect.top + rect.height + CARD_GAP / 2 가 y1, y2, y3 가 됨

// 컬럼 길이 - 1 => 해당 배열의 길이가 됨
// 카드 길이 - 1 => 객체 배열의 길이가 됨
영역좌표이차원배열 [
    { x1: [y1, y2, y3] }, { x2: [y1, y2] }, { x3: [] }
]
컬럼영역좌표배열 [x1, x2, x3] 여기서 인덱스가 몇번째 컬럼인지를 지칭하게 됨
위에서 if (e.clientX < curXcoor) return idx; 이 idx가 n번째 컬럼이라는 뜻
카드영역좌표배열 [[y1, y2, y3], [y4, y5], []] 몇번째 컬럼인지에 따라 순회할 배열이 정해짐
위에서 if (e.clientY < curXcoor) return idx; 이 idx가 n번째 카드라는 뜻
예를 들어 [y1, y2, y3]가 선택되면, 여기서도 인덱스가 몇번째 카드인지를 지칭함
=> 컬럼배열[colIdx].insertBefore(원본카드 ,컬럼별카드배열[colIdx, cardIdx])


카드위치이차원객체 {
    cardId1: { rect.left, rect.top }
    cardId2: { rect.left, rect.top }
}

가상돔카드위치이차원객체 {
    cardId2: { rect.left, rect.top }
    cardId1: { rect.left, rect.top }
}



*/