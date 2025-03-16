import { mergeObjects } from "./mergerObj.js";
import { makeTaskCard } from "./template/template.js";

//✅ 스토어 개념으로 가져다 쓰고 전체 교체하는 형식이면 dom조작 더 쉬워짐 -> 리팩토링 필요
export async function renderCards() {
  const main = document.querySelector(".page-main__columnlist");
  const mergedData = await mergeData();
  const taskHTML = createTaskHTML(mergedData);
  Object.entries(taskHTML).forEach(([dataType, HTML]) => {
    const targetSection = main.querySelector(
      `.task-list[data-type=${dataType}]`
    );
    if (targetSection) {
      targetSection.innerHTML = HTML;
    }
  });
}

async function mergeData() {
  const mockupData = await fetchData();
  const userData = getLocalStorageData();
  const mergedData = mergeObjects(mockupData, userData);
  return mergedData;
}

async function fetchData() {
  const response = await fetch("../jsonData_dir/mockup.json"); //목업 데이터 경로로 데이터 불러온다.

  const data = await response.json();
  return data;
}

function getLocalStorageData() {
  const storedData = localStorage.getItem("tasks");
  const tasks = storedData ? JSON.parse(storedData) : {}; //초기값이 없는 Null 인 상태 고려
  return tasks;
}

// function makeTaskList(taskData, mergedData) {
//   Object.keys(taskData).map((dataType) => {
//     return Object.entries(mergedData[dataType]).reduce((acc, [id, card]) => {
//       const title = card["title"];
//       const content = card["content"];
//       acc + makeTaskCard(id, title, content);
//     }, "");
//   });
// }

//HTML 문자열 형성 함수
function createTaskHTML(mergedData) {
  mergedData = mergedData || {}; // mergedData가 null이면 빈 객체로 초기화
  return Object.keys(mergedData).reduce((result, dataType) => {
    const cardContent = Object.entries(mergedData[dataType] || {}).reduce(
      (acc, [id, card]) => {
        const title = card["title"];
        const content = card["content"];
        return acc + makeTaskCard(id, title, content);
      },
      ""
    );

    result[dataType] = cardContent;
    return result;
  }, {});
}
