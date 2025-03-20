import KanbanStore from '../store/kanban-store.js';
import { createKanbanVirtualDOM } from '../components/kanban-renderer.js';

export default function initDragEvent() {
    const kanban = document.querySelector('.kanban');
    const body = document.querySelector('html');

    handleMousedown(kanban);
    handleMousemove(body);
    handleMouseup(body);
}

// 개별 상수 선언
const COLUMN_GAP = 24;  // px
const CARD_GAP = 10;   // px

const dragManager = {    // 또는 cardDragger, dragController
    ghostCard: null,
    draggedCard: null,   // 드래그 중인 카드 요소
    isDragging: false,
    dragOffsetX: null,     // 드래그 시작 시의 X 오프셋
    dragOffsetY: null,     // 드래그 시작 시의 Y 오프셋
    ghostCardPosition: null, // 잔상 현재 위치

    initializeDrag(e, rect, ghostCard) {
        this.ghostCard = ghostCard;
        this.draggedCard = document.querySelector('.card-clone');
        this.isDragging = true;
        this.dragOffsetX = e.clientX - rect.left;
        this.dragOffsetY = e.clientY - rect.top;
        this.ghostCardPosition = getCurPosition(e); // 잔상 초기 위치 설정
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
    kanbanDOM: null,
    columnElements: null,
    cardMatrix: null,
    columnBoundaries: null,
    cardBoundaryMatrix: null,
    
    updatedColumnElements: null,
    updatedCardMatrix: null,

    initialize() {
        this.kanbanDOM = getKanbanElement();
        this.columnElements = getColumnElements(this.kanbanDOM);
        this.cardMatrix = getCardMatrix(this.kanbanDOM);
        this.columnBoundaries = getColumnBoundaries(this.columnElements);
        this.cardBoundaryMatrix = getCardBoundaryMatrix(this.cardMatrix);
    },
    
    update() {
        this.updatedKanbanDOM = getKanbanElement();
        this.columnElements = getColumnElements(this.updatedKanbanDOM);
        this.cardMatrix = getCardMatrix(this.updatedKanbanDOM);
    },

    reset() {
        this.kanbanDOM = null;
        this.columnElements = null;
        this.cardMatrix = null;
        this.columnBoundaries = null;
        this.cardBoundaryMatrix = null;
    }
}

const 카드위치 = {
    드래그시작: null,
    드래그중: null
}

function handleMousedown(kanban) {
    kanban.addEventListener('dragstart', (e) => {
        e.preventDefault();
        const ghostCard = e.target.closest('.card');
        if (!ghostCard) return;

        createCloneCard(ghostCard);
        dragLayoutState.initialize();
        dragManager.initializeDrag(e, ghostCard.getBoundingClientRect(), ghostCard);
        카드위치.드래그시작 = 카드위치구하기(dragLayoutState.cardMatrix);
    });
}

function handleMousemove(html) {
    html.addEventListener('mousemove', (e) => {
        if (!dragManager.isDragging) return;
        dragManager.updateDragPosition(e.clientX, e.clientY);

        updateGhostCard(e);
    });
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

function getKanbanElement() {
    return document.querySelector('.kanban');
}

function getColumnElements(kanbanDOM) {
    return [...kanbanDOM.querySelectorAll('.column')];
}

function getCardMatrix(kanbanDOM) {
    const columns = [...kanbanDOM.querySelectorAll('.column')];
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
// 카드 위치 구하기  @@@@ 구현필요
// x1,x2,y1,y2 등 컬럼, 카드로 영역 나누기
// 원본에 잔상효과 추가
// 복사본 생성
// 복사본 좌표 계산 및 업데이트
// 잔상 포지션 저장 ex) [1,0] 등

// mousemove
// 

// --- 필요 작업 ---
// 갱신 과정
  // 잔상 포지션과 현재 커서 포지션 비교 완
  // 같으면 아래 로직 실행 X 완
// 포지션 다를 때,
  // 잔상 이동
  // 잔상 포지션 갱신
  // 카드 위치 다시 구하기 @@@@ 구현필요
  // 카드의 위치 차이 계산 
  // 계산 값 css로 적용 transform (0.3s)
// --- 완료 작업 ---
// 복사본 좌표 계산 및 업데이트
// 현재 영역 인덱스 반환

function getCurPosition({ clientX, clientY }) {    // 현재 위치를 찾는 함수
    const columnBoundaries = dragLayoutState.columnBoundaries;
    const targetColumnIndex = columnBoundaries.findIndex(boundary => clientX < boundary);

    const cardBoundaries = dragLayoutState.cardBoundaryMatrix[targetColumnIndex];
    const targetCardIndex = cardBoundaries.findIndex(boundary => clientY < boundary);

    // 경계를 넘어가면 마지막 위치 반환
    // findIndex는 값을 찾지 못하면 -1을 반환
    return [
        targetColumnIndex >= 0 ? targetColumnIndex : columnBoundaries.length,
        targetCardIndex >= 0 ? targetCardIndex : cardBoundaries.length
    ];
}

function isSamePosition(newColumnIndex, newCardIndex) {
    const [currentColumnIndex, currentCardIndex] = dragManager.ghostCardPosition;
    return newColumnIndex === currentColumnIndex && newCardIndex === currentCardIndex;
}

function updateGhostCard(e) {
    const ghostCard = dragManager.ghostCard;
    const curPosition = getCurPosition(e);
    const [curColumnIndex, curCardIndex] = curPosition; 
    console.log(curColumnIndex, curCardIndex)
    // 이전 위치와 동일하면 업데이트 불필요
    if (isSamePosition(curColumnIndex, curCardIndex)) return;
    // 잔상 이동 및 제거, 잔상 포지션 갱신
    updateGhostCardPosition(ghostCard, curColumnIndex, curCardIndex);
    dragLayoutState.update();
    // 카드 위치 구하기
    // 카드 차이 구하기
    // transform 적용
}

function updateGhostCardPosition(ghostCard, newColumnIndex, newCardIndex) {
    removeGhostCard(ghostCard);
    moveGhostCard(ghostCard, newColumnIndex, newCardIndex);
    updateGhostCardState(newColumnIndex, newCardIndex);
    dragLayoutState.update();
    // 카드 위치 구하기
    // 카드 차이 구하기
    // transform 적용
}

function removeGhostCard(ghostCard) {
    ghostCard.remove();
}

function moveGhostCard(ghostCard, newColumnIndex, newCardIndex) {
    const targetColumn = dragLayoutState.columnElements[newColumnIndex];
    const targetCard = dragLayoutState.cardMatrix[newColumnIndex][newCardIndex];
    
    if (!targetCard) {
        targetColumn.appendChild(ghostCard);
    } else {
        targetColumn.insertBefore(ghostCard, targetCard);
    }
}

function updateGhostCardState(newColumnIndex, newCardIndex) {
    dragManager.ghostCardPosition = [newColumnIndex, newCardIndex];
}

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