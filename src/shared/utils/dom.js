// DOM 요소에 자식 요소 추가 (끝에)
function pushChild(parent, child) {
  if (parent && child) {
    parent.insertAdjacentHTML('beforeend', child);
  }
}

// DOM 요소에 자식 요소 추가 (앞에)
function unshiftChild(parent, child) {
  if (parent && child) {
    parent.insertAdjacentHTML('afterbegin', child);
  }
}

export { pushChild, unshiftChild };
