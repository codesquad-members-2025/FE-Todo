import { ActionTypes } from "./actions.js";

class StoreClass {
  constructor() {
    // 어플리케이션에서 관리할 모든 상태
    this.state = {
      columns: [],
      history: [],
    };
    // View(또는 다른 구독자)들이 상태 변화를 감지하기 위해 등록하는 콜백 함수
    this.listeners = [];

    // 칼럼 id 관리: 모든 칼럼에 대해 하나의 전역 카운터
    this.lastColumnId = 0;
    // 카드 id 관리: 각 칼럼마다 별도의 id 카운터를 저장할 객체
    this.lastCardIdByColumn = {};
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    // 상태가 변할 때마다 호출할 콜백 함수를 저장
    this.listeners.push(listener);
  }

  emitChange() {
    // 현재 등록된 모든 리스너에게 “상태가 변했다”는 것을 알림
    this.listeners.forEach((listener) => listener());
  }

  // 초기 데이터 기반으로 칼럼 id와 각 칼럼의 카드 id 카운터 초기화
  initializeIdCounters() {
    // 칼럼 id의 최대값
    this.lastColumnId = this.state.columns.reduce(
      (max, column) => Math.max(max, column.id),
      0
    );

    // 각 칼럼의 카드 id 최대값을 계산하여 저장
    this.state.columns.forEach((column) => {
      const maxCardId = (column.cards || []).reduce(
        (max, card) => Math.max(max, card.id),
        0
      );
      this.lastCardIdByColumn[column.id] = maxCardId;
    });
  }

  // 칼럼 id 생성: 1씩 증가
  generateColumnId() {
    return ++this.lastColumnId;
  }

  // 해당 칼럼에 대한 카드 id 생성: 1씩 증가
  generateCardId(columnId) {
    if (!this.lastCardIdByColumn[columnId]) {
      this.lastCardIdByColumn[columnId] = 0;
    }
    return ++this.lastCardIdByColumn[columnId];
  }

  // 새로운 카드 추가 메서드
  addCard(columnId, card) {
    const newCard = {
      ...card,
      id: this.generateCardId(columnId),
    };
    this.state.columns = this.state.columns.map((column) => {
      if (column.id === columnId) {
        this.addHistory(`${column.title}에 카드 "${card.title}" 추가`);
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });
  }

  // 카드 삭제 메서드
  deleteCard(columnId, cardId) {
    this.state.columns = this.state.columns.map((column) => {
      if (column.id === columnId) {
        this.addHistory(`${column.title}의 카드 제거`);
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== cardId),
        };
      }
      return column;
    });
  }

  // 카드 수정 메서드
  updateCard(columnId, cardId, updatedData) {
    this.state.columns = this.state.columns.map((column) => {
      if (column.id === columnId) {
        this.addHistory(`${column.title}의 카드 수정`);
        return {
          ...column,
          cards: column.cards.map((card) =>
            card.id === cardId ? { ...card, ...updatedData } : card
          ),
        };
      }
      return column;
    });
    this.addHistory(`Card updated.`);
  }

  // 히스토리 추가: emitChange() 제거 - handleAction에서 한 번만 호출
  addHistory(message) {
    this.state.history.push({ message, timestamp: new Date().toISOString() });
  }

  handleAction(action) {
    switch (action.type) {
      case ActionTypes.ADD_CARD:
        this.addCard(action.payload.columnId, action.payload.card);
        break;
      case ActionTypes.DELETE_CARD:
        this.deleteCard(action.payload.columnId, action.payload.cardId);
        break;
      case ActionTypes.UPDATE_CARD:
        this.updateCard(
          action.payload.columnId,
          action.payload.cardId,
          action.payload.updatedData
        );
        break;
      case ActionTypes.ADD_HISTORY:
        this.state.history.push(action.payload);
        break;
      default:
        return;
    }
    this.emitChange();
  }
}

export const Store = new StoreClass();
