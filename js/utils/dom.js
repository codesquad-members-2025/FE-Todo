//dom에 요소 추가하는 함수
export { addElementToParent };

function addElementToParent(parentElement, newElement) {
  if (typeof newElement === 'string') {
    parentElement.insertAdjacentHTML('beforeend', newElement);
  } else {
    parentElement.appendChild(newElement);
  }
}
