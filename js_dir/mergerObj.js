export function mergeObjects(obj1, obj2) {
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
