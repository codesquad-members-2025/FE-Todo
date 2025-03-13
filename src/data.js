import { columnsComponent } from "./components/columns_component";

// 칼럼 동적으로 생성하기
// 비동기로 mock.json 불러오기
const fetchMockData = async () => {
  const response = await fetch("/data/mock.json");
  const data = await response.json();
  return data;
};

export const renderColumns = async () => {
  const data = await fetchMockData();

  // 불러온 데이터를 컴포넌트에 넣어서 렌더링
  const columnContainer = document.querySelector(".column-container");
  columnContainer.innerHTML += columnsComponent(data);
};
