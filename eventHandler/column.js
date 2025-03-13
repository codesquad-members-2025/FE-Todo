const columnList = document.querySelector(".columnList");

export function eventAddCard() {
  const addButton = columnList.querySelector(".column-header__plusButton");
  addButton.addEventListener("click", function (event) {
    const existAddCard = columnList.querySelector(".add-card");
    if (existAddCard) {
      existAddCard.remove();
    } else {
      const columnList = event.target.closest(".column-header");
      if (columnList && columnList.nextElementSibling) {
        const fragment = document.createDocumentFragment();
        const addCardForm = createAddCardForm();
        fragment.appendChild(addCardForm);
        columnList.nextElementSibling.prepend(fragment);
        processAddCard(addCardForm);
      }
    }
  });
}

function createAddCardForm() {
  const addCardForm = document.createElement("div");
  addCardForm.classList.add("add-card");
  addCardForm.innerHTML = `<div class="add-card__input">
<input
type="text"
class="add-card__input__title"
placeholder="제목을 입력하세요"
/>
<textarea
class="add-card__input__content"
rows="1"
maxlength="500"
oninput="resizeHeight(this)"
placeholder="내용을 입력하세요"
wrap="hard"
></textarea>
</div>
<div class="add-card__buttons">
<button class="add-card__cancle-btn">취소</button>
<button class="add-card__submit-btn">등록</button>
</div>
</div>`;
  return addCardForm;
}

function processAddCard(addCardForm) {
  addCardForm.addEventListener("click", function (event) {
    if (event.target.className === "add-card__cancle-btn") addCardForm.remove();
  });
}
