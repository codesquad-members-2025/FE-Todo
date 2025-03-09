//history 열기
function toggleHistory() {
  const history = document.querySelector('#history');
  const isVisable = window.getComputedStyle(history).display === 'flex';

  if (!isVisable) {
    history.style.display = 'flex';
  } else {
    history.style.display = 'none';
  }
}

export { toggleHistory };
