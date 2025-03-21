import KanbanStore from '../store/kanban-store.js';

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

/**
 * Drag State Managers
 * ==================
 */

/**
 * 드래그 중인 카드의 상태 관리
 * --------------------------
 * - 드래그 중인 카드(복제본)의 참조 및 상태
 * - 마우스 오프셋 값
 * - 드래그 시작/현재/이전 위치 좌표
 */
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

/**
 * 칸반 보드 레이아웃 상태 관리
 * -------------------------
 * - DOM 요소 참조 (칸반, 컬럼, 카드)
 * - 경계선 좌표 정보
 * - 레이아웃 업데이트 및 초기화
 */
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

    adjustStartColumnLayout(startX) {
        this.cardBoundaryMatrix[startX].pop();
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

/**
 * 카드 위치 정보 상태 관리
 * ---------------------
 * - 카드의 초기 위치 정보
 * - 수평/수직 이동 거리 매트릭스
 * - 위치 정보 업데이트 및 초기화
 */
const cardLocationState = {
    cardPositionMatrix: null,
    cardVerticalMatrix: null,
    ghostCardStartTop: null,
    ghostCardCurTop: null,
    ghostCardOffset: null,


    initialize() {
        this.cardPositionMatrix = getCardPositionMatrix(dragLayoutState.cardMatrix);
    },

    setGhostCardStartTop(ghostCard) {
        this.ghostCardStartTop = ghostCard.getBoundingClientRect().top;
    },

    // setGhostCardCurTop(startY, curX, curY) {
    // },

    updateCardOffset(startPosition, currentPosition) {
        [this.cardVerticalMatrix, this.ghostCardOffset] = getCardOffset(startPosition, currentPosition);
    },

    reset() {
        this.cardPositionMatrix = null;
        this.cardVerticalMatrix = null;
    }
}

/**
 * Event Handlers
 * -------------
 * 마우스 이벤트 핸들링 함수들
 */
function handleMousedown(kanban) {
    kanban.addEventListener('dragstart', (e) => {
        e.preventDefault();
        const ghostCard = e.target.closest('.card');
        if (!ghostCard) return;

        createCloneCard(ghostCard);
        dragLayoutState.initialize();
        dragManager.initialize(e, ghostCard.getBoundingClientRect(), ghostCard);
        dragLayoutState.adjustStartColumnLayout(getCurPosition(e)[0]);
        cardLocationState.initialize();
        dragManager.updateRecentPosition(...getCurPosition(e));
        cardLocationState.setGhostCardStartTop(ghostCard);
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
        KanbanStore.moveCard(dragManager.startPosition, dragManager.currentPosition);
        dragManager.reset();
        cardLocationState.reset();
        dragLayoutState.reset();
    });
}

/**
 * Mousemove Helpers
 * ---------------
 * 마우스 이동 중 위치 추적 및 상태 업데이트
 */
function isSamePosition(x1, y1, x2, y2) {
    return x1 === x2 && y1 === y2;
}
function updateCardState(e) {
    const startPosition = dragManager.startPosition;
    const currentPosition = dragManager.currentPosition;
    const recentPosition = dragManager.recentPosition;
    // 이전 위치와 동일하면 업데이트 불필요
    if (isSamePosition(...currentPosition, ...recentPosition)) return;
    dragManager.updateRecentPosition(...getCurPosition(e));
    cardLocationState.updateCardOffset(startPosition, currentPosition);
    cardLocationState.setGhostCardCurTop(startPosition[0], currentPosition[0], currentPosition[1])
    animatedCards();
    animateGhostCard();
}

/**
 * DOM Element Handlers
 * ------------------
 * DOM 요소 생성 및 조작 관련 함수들
 */
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

/**
 * Boundary Calculation
 * ------------------
 * 요소들의 경계선 좌표 계산 함수들
 */
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

/**
 * Card Position Calculation
 * ----------------------
 * 카드 위치 계산 관련 함수들
 */
function getCardPositionMatrix(cardMatrix) {
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
function getCardOffset(startPosition, currentPosition) {
    const [startX, startY] = startPosition;
    const [curX, curY] = currentPosition;
    const ghostCardHeight = dragManager.ghostCard.getBoundingClientRect().height;
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const verticalOffsetMatrix = [];
    const horizontalOffset = calculateGhostCardOffset(startX, startY, curX, curY);

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            if (!verticalOffsetMatrix[x]) verticalOffsetMatrix[x] = [];

            if (startX === curX) {
                if (x !== curX) verticalOffsetMatrix[x][y] = 0;
                else verticalOffsetMatrix[x][y] = calculateSameColumnOffset(x, y, startY, curY, ghostCardHeight);
            }

            else if (startX !== curX) {
                if (x === startX) {
                    // 컬럼 이동 시, 시작 컬럼의 이동거리 계산
                    verticalOffsetMatrix[x][y] = calculateStartColumnOffset(y, startY, ghostCardHeight);
                }
                else if (x === curX) {
                    // 컬럼 이동 시, 타겟 컬럼의 이동거리 계산
                    verticalOffsetMatrix[x][y] = calculateTargetColumnOffset(y, curY, ghostCardHeight);
                }
                else {
                    // 시작, 타겟 컬럼이 아니면 이동거리 0
                    verticalOffsetMatrix[x][y] = 0;
                }
            }
        }
    }

    return [verticalOffsetMatrix, horizontalOffset];
}
// function calculateGhostCardOffset(cardMatrix, curX, curY) {
//     const { left, top } = cardMatrix[curX][curY].getBoundingClientRect();
//     return [left, top];
// }
function calculateGhostCardOffset(startX, startY, curX, curY) {
    const columnElements = dragLayoutState.columnElements;
    const { left: startLeft } = columnElements[startX].getBoundingClientRect();
    const { left: curLeft } = columnElements[curX].getBoundingClientRect();
    const offsetX = curLeft - startLeft;
    
    const startTop = cardLocationState.ghostCardStartTop;
    const curTop = cardLocationState.ghostCardCurTop;
    const offsetY = curTop - startTop;

    return [offsetX, offsetY];
}

/**
 * Offset Calculation
 * ----------------
 * 카드 이동 거리 계산 함수들
 */
function calculateSameColumnOffset(x, y, startY, curY, ghostCardHeight) {
    const distance = ghostCardHeight + CARD_GAP;
    // 현재 카드가 startY보다 낮을 때
    if (y < startY) {
        if (y < curY) return 0;
        else if (y >= curY) return distance;
    }
    // 현재 카드가 startY일 때
    else if (y === startY) {
        if (y < curY) return getSumCardHeight(x, y, curY) + CARD_GAP * (curY - y); // 차이만큼 내려감
        else if (y === curY) return 0; // 그대로
        else if (y > curY) return -(getSumCardHeight(x, y, curY) + CARD_GAP * (y - curY)) // 차이만큼 올라감
    }
    // 현재 카드가 startY보다 높을 때
    else if (y > startY) {
        if (y <= curY) return -distance;
        else if (y > curY) return 0;
    }
}
function calculateStartColumnOffset(y, startY, ghostCardHeight) {
    const distance = ghostCardHeight + CARD_GAP;
    if (y < startY) return 0;
    else if (y >= startY) return -distance;
}
function calculateTargetColumnOffset(y, curY, ghostCardHeight) {
    const distance = ghostCardHeight + CARD_GAP;
    if (y < curY) return 0;
    else if (y >= curY) return distance;
}
function getSumCardHeight(x, startY, curY) {
    let startIdx, endIdx;
    if (startY > curY) {
        startIdx = curY
        endIdx = startY
    } else if (startY < curY) {
        startIdx = startY + 1;
        endIdx = curY + 1;
    }

    const cardMatrix = dragLayoutState.cardMatrix;   
    let totalHeight = 0;

    for (let i = startIdx; i < endIdx; i++) {
        totalHeight += cardMatrix[x][i].getBoundingClientRect().height;
    }
    return totalHeight;
}

/**
 * Animation Handlers
 * ---------------
 * 카드 애니메이션 관련 함수들
 */
function animatedCards() {
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const verticalOffsetMatrix = cardLocationState.cardVerticalMatrix;

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            const card = cardMatrix[x][y];
            const verticalOffset = verticalOffsetMatrix[x][y];

            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.transform = `translateY(${verticalOffset}px`;
        }
    }
}
function animateGhostCard() {
    const ghostCard = dragManager.ghostCard;
    const ghostCardOffset = cardLocationState.ghostCardOffset;

    ghostCard.style.transition = 'transform 0.3s ease-in-out';
    ghostCard.style.transform = `translate(${ghostCardOffset[0]}px, ${ghostCardOffset[1]}px)`
}

/**
 * Utility Function
 * ---------------
 * 유틸리티 함수
 */
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
    ]
}