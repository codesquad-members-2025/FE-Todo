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
    ghostCard: null,
    draggedCard: null,   // 드래그 중인 카드 요소
    isDragging: false,
    dragOffsetX: null,     // 드래그 시작 시의 X 오프셋
    dragOffsetY: null,     // 드래그 시작 시의 Y 오프셋

    startPosition: [-1, -1], // 잔상 시작 위치 (x, y)
    currentPosition: [-1, -1], // 현재 위치
    recentPosition: [-1, -1], // 이전 위치

    initialize(e, rect, ghostCard) {
        this.ghostCard = ghostCard;
        this.draggedCard = document.querySelector('.card-clone');
        this.isDragging = true;
        this.dragOffsetX = e.clientX - rect.left;
        this.dragOffsetY = e.clientY - rect.top;
        this.startPosition = getCurPosition(e); // 잔상 초기 위치 설정
        this.updateDraggedCardPosition(e.clientX, e.clientY);
    },

    updateDraggedCardPosition(clientX, clientY) {
        this.draggedCard.style.left = `${clientX - this.dragOffsetX}px`;
        this.draggedCard.style.top = `${clientY - this.dragOffsetY}px`;
    },

    updateCurrentPosition(clientX, clientY) {
        this.currentPosition = [clientX, clientY];
    },

    updateRecentPosition(clientX, clientY) {
        this.recentPosition = [clientX, clientY];
    },

    reset() {
        this.ghostCard = null;
        this.draggedCard.remove();
        this.draggedCard = null;
        this.isDragging = false;
        this.dragOffsetX = null;
        this.dragOffsetY = null;
        this.startPosition = [-1, -1];
        this.currentPosition = [-1, -1];
        this.recentPosition = [-1, -1];
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

const cardLocationState = {
    cardLocationMatrix: null,
    cardLocationGap: null,

    initialize() {
        this.cardLocationMatrix = getCardLocationMatrix(dragLayoutState.cardMatrix);
    },

    updateGap(position, draggedPosition) {
        this.cardLocationGap = getCardLocationGap(position, draggedPosition);
    },

    reset() {
        this.cardLocationMatrix = null;
        this.cardLocationGap = null;
    }
}

function handleMousedown(kanban) {
    kanban.addEventListener('dragstart', (e) => {
        e.preventDefault();
        const ghostCard = e.target.closest('.card');
        if (!ghostCard) return;

        createCloneCard(ghostCard);
        dragLayoutState.initialize();
        dragManager.initialize(e, ghostCard.getBoundingClientRect(), ghostCard);
        cardLocationState.initialize();
        dragManager.updateRecentPosition(...getCurPosition(e));
    });
}

function handleMousemove(html) {
    html.addEventListener('mousemove', (e) => {
        if (!dragManager.isDragging) return;
        dragManager.updateDraggedCardPosition(e.clientX, e.clientY);
        dragManager.updateCurrentPosition(...getCurPosition(e));
        updateCardState(e);
    });
}

function handleMouseup(html) {
    html.addEventListener('mouseup', () => {
        if (!dragManager.isDragging) return;
        dragManager.reset();
        cardLocationState.reset();
        resetCardSwap();
        dragLayoutState.reset();
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


//--------------------------------------------
//------------카드로케이션로직-----------------
//--------------------------------------------


function getCardLocationMatrix(cardMatrix) {
    return cardMatrix.reduce((locationMatrix, cards) => {
        locationMatrix.push(getCardLocation(cards));
        return locationMatrix;
    }, []);
}

function getCardLocation(cards) {
    return cards.reduce((locations, card) => {
        const rect = card.getBoundingClientRect();
        locations.push(rect.top);
        return locations;
    }, []);
}

// 각 카드의 transform 픽셀 거리를 구함
// 나름대로 함수 분리해서 가독성 높였음
function getCardLocationGap(startPosition, currentPosition) {
    const [startX, startY] = startPosition;
    const [curX, curY] = currentPosition;
    const ghostCardHeight = dragManager.ghostCard.getBoundingClientRect().height;
    const columns = dragLayoutState.columnElements;
    const cardmatrix = dragLayoutState.cardMatrix;
    const cardLocationGap = [];

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardmatrix[x].length; y++) {

            if (!cardLocationGap[x]) cardLocationGap[x] = [];

            if (startX === curX) {
                if (x !== curX) cardLocationGap[x][y] = 0;
                else cardLocationGap[x][y] = calculateVerticalOffsetInSameColumn(x, y, startY, curY, ghostCardHeight);
            }

            else if (startX !== curX) {
                // 추후 작성
            }
        }
    }

    return cardLocationGap;
}

function calculateVerticalOffsetInSameColumn(x, y, startY, curY, ghostCardHeight) {
    // 현재 카드가 startY보다 낮을 때
    const distance = ghostCardHeight + CARD_GAP;
    if (y < startY) {
        if (y < curY) return 0; // 그대로
        else if (y === curY) return distance; // 내려감
        else if (y > curY) return distance; // 내려감
    }
    // 현재 카드가 startY일 때
    else if (y === startY) {
        if (y < curY) return getSumCardHeight(x, y, curY) + CARD_GAP * (curY - y); // 차이만큼 내려감
        else if (y === curY) return 0; // 그대로
        else if (y > curY) return -(getSumCardHeight(x, y, curY) + CARD_GAP * (curY - y)) // 차이만큼 올라감
    }
    // 현재 카드가 startY보다 높을 때
    else if (y > startY) {
        if (y < curY) return -distance; // 올라감
        else if (y === curY) return -distance; // 올라감
        else if (y > curY) return 0; // 그대로
    }
}

function getSumCardHeight(x, y, curY) {
    const [startY, endY] = [Math.min(y, curY), Math.max(y, curY)];
    const cardMatrix = dragLayoutState.cardMatrix;
    let totalHeight = 0;
    
    for (let i = startY + 1; i <= endY; i++) {
        totalHeight += cardMatrix[x][i].getBoundingClientRect().height;
    }
    return totalHeight;
}

function animateCardSwap() {
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const gapMatrix = cardLocationState.cardLocationGap;

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            const card = cardMatrix[x][y];
            const verticalGap = gapMatrix[x][y];

            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.transform = `translateY(${verticalGap}px`;
        }
    }
}

function resetCardSwap() {
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            const card = cardMatrix[x][y];
            card.style.transform = `0px`;
        }
    }
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
// 잔상이 있는 영역 구하기
// 현재컬럼, 기존컬럼
// 현재컬럼 => 몇번째 위치인지 구하고 그 아래 카드는 잔상 height만큼 transform
// 기존컬럼 => 몇번째 위치였는지 구하고 그 아래 카드 hegiht만큼 transform
// 따라서 현재 위치는 카드의 h
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
        targetColumnIndex >= 0 ? targetColumnIndex
            : columnBoundaries.length === 0 ? 0
                : columnBoundaries.length - 1,
        targetCardIndex >= 0 ? targetCardIndex
            : cardBoundaries.length === 0 ? 0
                : cardBoundaries.length - 1
    ];
}

function isSamePosition(x1, y1, x2, y2) {
    return x1 === x2 && y1 === y2;
}

function updateCardState(e) {
    const startPosition = dragManager.startPosition;
    const currentPosition = dragManager.currentPosition;
    const recentPosition = dragManager.recentPosition;
    // 이전 위치와 동일하면 업데이트 불필요
    if (isSamePosition(...currentPosition, ...recentPosition)) return;
    console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')
    console.log(`startPosition: ${startPosition}`)
    console.log(`draggedPostion: ${currentPosition}`)
    dragManager.updateRecentPosition(...getCurPosition(e));
    cardLocationState.updateGap(startPosition, currentPosition);
    console.log(cardLocationState.cardLocationGap);
    animateCardSwap();
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