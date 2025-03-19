// 칼럼 동적으로 생성하기
// 비동기로 mock.json 불러오기
export const fetchMockData = async () => {
  const response = await fetch("/data/mock.json");
  const data = await response.json();
  return data;
};
