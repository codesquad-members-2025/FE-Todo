// UUID 생성
function generateUUID(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// 현재 시간을 ISO 문자열로 반환
function getISOStringNow() {
  return new Date().toISOString();
}

// 디바이스 타입 감지
function detectDeviceType() {
  return navigator.maxTouchPoints > 0 ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? 'mobile'
    : 'web';
}

export { generateUUID, getISOStringNow, detectDeviceType };
