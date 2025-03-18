// DOM 요소에 자식 요소 추가 (끝에)
function pushChild(parentElement, childElement) {
  if (typeof childElement === 'string') {
    parentElement.insertAdjacentHTML('beforeend', childElement);
  } else {
    parentElement.appendChild(childElement);
  }
}

// DOM 요소에 자식 요소 추가 (앞에)
function unshiftChild(parentElement, childElement) {
  if (typeof childElement === 'string') {
    parentElement.insertAdjacentHTML('afterbegin', childElement);
  } else {
    parentElement.insertBefore(childElement);
  }
}

function stringToNode(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export { pushChild, unshiftChild, stringToNode };
