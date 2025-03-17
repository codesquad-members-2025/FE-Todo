//dom에 요소 추가하는 함수
function pushChild(parentElement, newElement) {
  if (typeof newElement === 'string') {
    parentElement.insertAdjacentHTML('beforeend', newElement);
  } else {
    parentElement.appendChild(newElement);
  }
}

function unshiftChild(parentElement, newElement) {
  if (typeof newElement === 'string') {
    parentElement.insertAdjacentHTML('afterbegin', newElement);
  } else {
    parentElement.prepend(newElement);
  }
}

export { pushChild, unshiftChild };
