// 기본적인 상태관리(Redux) 구조를 구현한 코드

// 액션 관리
const INCREASE = "increase";
const DECREASE = "decrease";

function actionCreator(type, payload) {
  return { type, payload };
}

const increaseAction = actionCreator(INCREASE, 1);
const decreaseAction = actionCreator(DECREASE, 1);

// 동작 코드
function createStore() {
  let state;
  let handlers = [];

  function dispatcher() {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return { dispatcher, subscribe, getState };
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatcher(increaseAction());
store.dispatcher(decreaseAction());
