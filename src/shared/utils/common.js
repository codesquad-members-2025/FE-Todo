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

function getTimeAgo(timestamp) {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const diffInMilliseconds = now - pastDate;

  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}주`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월`;
  } else {
    return `${Math.floor(diffInMonths / 12)}년`;
  }
}

export { generateUUID, getISOStringNow, detectDeviceType, getTimeAgo };
