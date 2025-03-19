// 데이터 가져오기
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('데이터를 가져오는데 실패했습니다:', error);
    return [];
  }
}
