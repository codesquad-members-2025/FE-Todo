function getISOStringNow() {
  const date = new Date();
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0; // 0~15 사이의 랜덤 정수
    const value = char === 'x' ? random : (random & 0x3) | 0x8; // 'y' 자리에는 8~B(8~11) 값만 들어가도록 설정
    return value.toString(16); // 16진수 변환
  });
}

export { getISOStringNow, generateUUID };
