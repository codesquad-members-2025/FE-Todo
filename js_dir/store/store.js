import { getStoreData } from "./mergeData.js";

export const store = {
  state: {}, //store의 데이터객체가 담길 공간
  logData: [],

  // 컨트롤러 통해서 이벤트 감지해서 받아와야한다.
  async init() {
    this.state = (await getStoreData()) || {}; // 목업 데이터 & 로컬 데이터 머지 (한 번만 실행)
  },
  getState() {
    return this.state;
  },

  //데이터를 store로 내보내기
  //컨트롤러 통해서 받아와야한다.
  setState() {
    localStorage.setItem("tasks", JSON.stringify(this.state));
  },

  // 카드 추가시 this.state를 조작하는 메서드
  addTask(taskType, taskData) {
    if (!this.state[taskType]) this.state[taskType] = {}; //객체로 초기화
    this.state[taskType][taskData.id] = {
      title: taskData.title,
      content: taskData.content,
    };
    this.setState(); //데이터 업데이트
  },

  removeTask(dataType, id) {
    delete this.state[dataType][id];
    this.setState(); //데이터 업데이트
  },

  //------------------------------------------
  //------------------------------------------
  //초반 한번만 실행
  logInit() {
    const storedLogs = localStorage.getItem("logs");
    const logs = storedLogs ? JSON.parse(storedLogs) : [];
    this.logData = logs;
  },
  getLogData() {
    return this.logData;
  },
  setLogData() {
    localStorage.setItem("logs", JSON.stringify(this.logData));
  },
  addLog(lodDataArr) {
    this.logData.push(lodDataArr);
    this.setLogData();
  },
  removeLogs() {
    this.logData = [];
    this.setLogData();
  },
};
