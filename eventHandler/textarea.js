function resizeHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function checkContentLength(textarea) {
  // 입력 받을 때 마다 글자 수 계산
  const submitButton = document.querySelector(".add-card__submit-btn");
  const trimedText = textarea.value.replace(/\s/g, "").length;
  if (trimedText !== 0) {
    submitButton.classList.add("vitalize");
  } else submitButton.classList.remove("vitalize");
}
