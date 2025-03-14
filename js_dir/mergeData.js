async function fetchMockData() {
  const response = await fetch("../jsonData_dir/mockup.json"); //목업 데이터 경로로 데이터 불러온다.

  const data = await response.json();
  return data;
}

function getLocalStorageData() {
  const storedData = localStorage.getItem("tasks");
  const tasks = storedData ? JSON.parse(storedData) : {}; //초기값이 없는 Null 인 상태 고려
  return tasks;
}

//로컬 스토리지 & 목업 데이터 두개 머지 함수... 사실 스토어 개념 있으면 로컬 스토리지 필요 없음
function mergeObjects(obj1, obj2) {
  obj1 = obj1 || {};
  obj2 = obj2 || {};
  const merged = { ...obj1 };
  Object.keys(obj2).forEach((key) => {
    if (Object.hasOwn(merged, key)) {
      merged[key] = { ...merged[key], ...obj2[key] };
    } else {
      merged[key] = { ...obj2[key] };
    }
  });

  return merged; //js 에서 다룰 수 있는 카드 데이터 객체
}

export async function getStoreData() {
  const mockupData = await fetchMockData();
  const userData = getLocalStorageData();
  const mergedData = mergeObjects(mockupData, userData);
  return mergedData; //현재 데이터인 객체 상태 반환
}
