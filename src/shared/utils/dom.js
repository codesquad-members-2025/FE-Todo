function stringToNode(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function getFragment() {
  return document.createDocumentFragment();
}

export { stringToNode, getFragment };
