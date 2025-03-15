function resizeHeight(textarea) {
  // textarea 영역 높이를 매번 초기화하여 자동으로 크기 설정
  textarea.style.height = "auto"; // 초기화
  // scrollHeight 속성 : 텍스트 내용의 높이에 맞춰서 크기를 조정 -> 모든 블록요소의 속성
  textarea.style.height = textarea.scrollHeight + "px";
  // scrollHeight는 내부 콘텐츠의 전체 높이를 textarea의 높이로
}

function checkContentLength(textarea) {
  // 입력 받을 때 마다 글자 수 계산
  const submitButton = document.querySelector(".add-card__submit-btn");
  const trimedText = textarea.value.replace(/\s/g, "").length; // 공백으로만 내용을 채운 것을 고려
  if (trimedText !== 0) {
    submitButton.classList.add("vitalize");
  } else submitButton.classList.remove("vitalize");
}
