const openButton = document.getElementById("historyOpenButton");
const historyListLayer = document.getElementById("historyList");

openButton.addEventListener("click", function () {
  historyListLayer.classList.add("active"); // active 클래스를 추가하여 슬라이드 애니메이션 적용
});
