// 기본적인 상태관리(Redux) 구조를 구현한 코드
function createStore() {
  let state;
  let handlers = [];

  function send() {
    state = worker(state, action);
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return { send, subscribe, getState };
}

function worker(state = { count: 0 }, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
}

const store = createStore(worker);

store.subscribe(() => {
  console.log(store.getState());
});

store.send({ type: "increase" });
store.send({ type: "decrease" });
