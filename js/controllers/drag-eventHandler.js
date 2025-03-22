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
const dragManager = {
    draggedCard: null,
    floatingCard: null,
    isDragging: false,
    dragOffsetX: null,
    dragOffsetY: null,

    startPosition: [-1, -1],
    currentPosition: [-1, -1],
    recentPosition: [-1, -1],

    initialize(e, rect, draggedCard) {
        this.draggedCard = draggedCard;
        this.floatingCard = document.querySelector('.floating-card');
        this.isDragging = true;
        this.dragOffsetX = e.clientX - rect.left;
        this.dragOffsetY = e.clientY - rect.top;
        this.startPosition = getCurPosition(e); // 잔상 초기 위치 설정
        this.updateFloatingCardLocation(e.clientX, e.clientY);
    },

    updateFloatingCardLocation(clientX, clientY) {
        this.floatingCard.style.left = `${clientX - this.dragOffsetX}px`;
        this.floatingCard.style.top = `${clientY - this.dragOffsetY}px`;
    },

    updateCurrentPosition(currentPosition) {
        this.currentPosition = currentPosition;
    },
    
    updateRecentPosition(recentPosition) {
        this.recentPosition = recentPosition;
    },

    reset() {
        this.draggedCard = null;
        this.floatingCard.remove();
        this.floatingCard = null;
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
    cardRectTopMatrix: null,
    cardTransformYMatrix: null,

    draggedCardStartTop: null,
    draggedCardCurTop: null,

    draggedCardTransformValues: null,


    initialize() {
        this.cardRectTopMatrix = getCardRectTopMatrix(dragLayoutState.cardMatrix);
    },

    updateDraggedCardTransformValues(startPosition, currentPosition) {
        this.draggedCardTransformValues = calcDraggedCardTransformValue(...startPosition, ...currentPosition);
    },

    updateCardTransformYMatrix(startPosition, currentPosition) {
        this.cardTransformYMatrix = getCardTransformYMatrix(startPosition, currentPosition);
    },

    reset() {
        this.cardRectTopMatrix = null;
        this.cardTransformYMatrix = null;
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
        const draggedCard = e.target.closest('.card');
        if (!draggedCard) return;

        appendFloatingCardElement(draggedCard);

        dragLayoutState.initialize();
        dragLayoutState.adjustStartColumnLayout(getCurPosition(e)[0]);

        dragManager.initialize(e, draggedCard.getBoundingClientRect(), draggedCard);
        dragManager.updateRecentPosition(getCurPosition(e));

        cardLocationState.initialize();
    });
}
function handleMousemove(html) {
    html.addEventListener('mousemove', (e) => {
        if (!dragManager.isDragging) return;
        dragManager.updateFloatingCardLocation(e.clientX, e.clientY);
        dragManager.updateCurrentPosition(getCurPosition(e));

        const startPosition = dragManager.startPosition;
        const currentPosition = dragManager.currentPosition;
        const recentPosition = dragManager.recentPosition;

        if (isSamePosition(...currentPosition, ...recentPosition)) return;

        dragManager.updateRecentPosition(getCurPosition(e));
        
        console.log(dragManager.currentPosition)

        cardLocationState.updateCardTransformYMatrix(startPosition, currentPosition);
        cardLocationState.updateDraggedCardTransformValues(startPosition, currentPosition);

        animatedCards();
        animateDraggedCard();
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

/**
 * DOM Element Handlers
 * ------------------
 * DOM 요소 생성 및 조작 관련 함수들
 */
function appendFloatingCardElement(card) {
    const floatingCard = card.cloneNode(true);
    floatingCard.classList.remove('card');
    floatingCard.classList.add('floating-card');
    document.querySelector('body').appendChild(floatingCard);
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
function getCardRectTopMatrix(cardMatrix) {
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
function getCardTransformYMatrix(startPosition, currentPosition) {
    const [startX, startY] = startPosition;
    const [curX, curY] = currentPosition;
    const draggedCardHeight = dragManager.draggedCard.getBoundingClientRect().height;
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const verticalOffsetMatrix = [];

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            if (!verticalOffsetMatrix[x]) verticalOffsetMatrix[x] = [];
            verticalOffsetMatrix[x][y] = calcCardTransformY(x, y, startX, startY, curX, curY, draggedCardHeight);
        }
    }

    return verticalOffsetMatrix;
}
/**
 * Offset Calculation
 * ----------------
 * 카드 이동 거리 계산 함수
 */
function calcDraggedCardTransformValue(startX, startY, curX, curY) {
    const columnElements = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const cardRectTopMatrix = cardLocationState.cardRectTopMatrix;
    const curColumnLength = cardMatrix[curX].length;

    let isEndOfColumn = false;
    if (curY === curColumnLength) {
        curY--;
        isEndOfColumn = true;
    }

    // transformX 구하기
    const { left: startLeft } = columnElements[startX].getBoundingClientRect();
    const { left: curLeft } = columnElements[curX].getBoundingClientRect();

    const transformX = curLeft - startLeft;

    // transformY 구하기
    const startTop = cardRectTopMatrix[startX][startY];

    // currentX가 카드가 없는 컬럼일 때
    if (curColumnLength === 0) {
        const rect = columnElements[curX].querySelector('.column-header').getBoundingClientRect();
        const curTop = rect.top + rect.height + CARD_GAP;
        const transformY = curTop - startTop;
        return [transformX, transformY];
    }
    
    // currentX가 카드가 있는 컬럼일 때
    const curTop = cardRectTopMatrix[curX][curY];
    // draggedCrad, currentTargetCard의 높이 차이 구하기
    let startCardHeight = cardMatrix[startX][startY].getBoundingClientRect().height;
    let curCardHeight = cardMatrix[curX][curY].getBoundingClientRect().height;
    const cardHeightGap = curCardHeight - startCardHeight;
    // 마지막 카드 뒤에 쌓일 때
    const lastCardHeight = cardMatrix[curX][curY].getBoundingClientRect().height;

    const transformY = curTop - startTop + 
        (startX === curX && startY < curY ? cardHeightGap : 0) +
        (isEndOfColumn ? lastCardHeight + CARD_GAP : 0);
    return [transformX, transformY];
}
function calcCardTransformY(x, y, startX, startY, curX, curY, draggedCardHeight) {
    const distance = draggedCardHeight + CARD_GAP;

    if (startX === curX) {
        if (x !== curX) return 0;
        else {
            if (y < startY && y >= curY) return distance;
            else if (y > startY && y <= curY) return -distance;
            else return 0;
        }
    } else {
        if (x === startX) {
            if (y < startY) return 0;
            else if (y >= startY) return -distance;
        }
        else if (x === curX) {
            if (y < curY) return 0;
            else if (y >= curY) return distance;
        }
        else {
            return 0;
        }
    }
}

/**
 * Animation Handlers
 * ---------------
 * 카드 애니메이션 관련 함수들
 */
function animatedCards() {
    const columns = dragLayoutState.columnElements;
    const cardMatrix = dragLayoutState.cardMatrix;
    const verticalOffsetMatrix = cardLocationState.cardTransformYMatrix;

    for (let x = 0; x < columns.length; x++) {
        for (let y = 0; y < cardMatrix[x].length; y++) {
            const card = cardMatrix[x][y];
            const verticalOffset = verticalOffsetMatrix[x][y];

            card.style.transition = 'transform 0.25s ease-in-out';
            card.style.transform = `translateY(${verticalOffset}px`;
        }
    }
}
function animateDraggedCard() {
    const draggedCard = dragManager.draggedCard;
    const [transformX, transformY] = cardLocationState.draggedCardTransformValues;

    draggedCard.style.transition = 'transform 0.2s ease-in-out';
    draggedCard.style.transform = `translate(${transformX}px, ${transformY}px)`
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