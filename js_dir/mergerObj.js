//로컬 스토리지 & 목업 데이터 두개 머기 함수... 사실 스토어 개념 있으면 로컬 스토리지 필요 없음

export function mergeObjects(obj1, obj2) {
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

  return merged;
}
