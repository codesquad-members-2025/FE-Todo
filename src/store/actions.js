export const ActionTypes = {
  ADD_CARD: "ADD_CARD",
  DELETE_CARD: "DELETE_CARD",
  UPDATE_CARD: "UPDATE_CARD",
  ADD_HISTORY: "ADD_HISTORY",
};

export const Actions = {
  addCard: (columnId, card) => ({
    type: ActionTypes.ADD_CARD,
    payload: { columnId, card },
  }),
  deleteCard: (columnId, cardId) => ({
    type: ActionTypes.DELETE_CARD,
    payload: { columnId, cardId },
  }),
  updateCard: (columnId, cardId, updatedData) => ({
    type: ActionTypes.UPDATE_CARD,
    payload: { columnId, cardId, updatedData },
  }),
  addHistory: (history) => ({
    type: ActionTypes.ADD_HISTORY,
    payload: { history, timestamp: new Date() },
  }),
};
