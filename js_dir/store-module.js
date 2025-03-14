import { getStoreData } from "./mergeData.js";
import { makeTaskCard } from "./template.js";

export const store = {
  state: {}, //store의 데이터객체가 담길 공간

  getState() {
    this.state = getStoreData(); //현재 상태 불러오기
  },

  //데이터를 store로 내보내기
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
};
