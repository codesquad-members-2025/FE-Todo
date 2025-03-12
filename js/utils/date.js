function getISOStringNow() {
  const date = new Date();
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export { getISOStringNow };
