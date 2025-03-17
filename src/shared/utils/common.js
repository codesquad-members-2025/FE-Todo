// UUID 생성
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
