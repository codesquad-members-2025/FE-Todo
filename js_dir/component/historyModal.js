import { makeLog } from "../template/template.js";
import { DeleteAlert } from "./deleteAlertModal.js";
export const historyModalUi = {
  historySidebar: document.getElementById("popover-sidebar"),
  alertMessage: "모든 사용자 활동 기록을 삭제할까요?",
  cancelMessage: "취소",
  logNodes: [],
  targetUl: document.getElementById("activity-list__ul"),

  init: function () {
    this.logSection = this.historySidebar.querySelector("#activity-list__ul");
    this.emptyMessage = this.historySidebar.querySelector(
      "#popover__empty-message"
    );
  },
  toggleSidebar: function () {
    this.historySidebar.classList.toggle("open");
  },

  closeSidebar: function () {
    this.historySidebar.classList.remove("open");
  },

  deleteHistory: function () {
    /*
    if (!this.logSection) return; //빈 문자열인데 falsy 판단이 가능해..?
    if (!emptyMessage) return; //display가 숨겨져있는데 판단 가능..?
    - 일단 삭제만 구현
    */
    this.logSection.innerHTML = "";
    this.emptyMessage.style.display = "block";
    //store에서도 데이터를 지워야함
    DeleteAlert.closeDeleteModal(); //이거는 다른 모듈에서 조작할까?
  },

  makeRegisterLog: function (title, columnType, time) {
    const logTitle = `<strong>${title}</strong>`;
    const logColumnType = `<strong>${columnType}</strong>`;
    const content = `${logTitle}을(를)${logColumnType}에 <strong>등록</strong>하였습니다.`;
    const newLog = document.createElement("li");
    newLog.classList.add("activity-list__list");
    newLog.innerHTML = makeLog(content, time);
    this.logNodes.push(newLog);
    return content;
  },
  drawRegisterLog: function () {
    this.emptyMessage.style.display = "none";

    const fragment = document.createDocumentFragment();
    this.logNodes.forEach((logNode) => {
      fragment.appendChild(logNode);
    });
    this.targetUl.appendChild(fragment);
    this.logNodes = [];
  },
};

historyModalUi.init();
