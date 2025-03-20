export function createShowCardForm(title, content, author = "author by web") {
  const cardElement = document.createElement("div");
  cardElement.classList.add("show-card");
  const realContent = content.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
  cardElement.innerHTML = `<div class="show-card__total">
      <h3 class="show-card__title">${title}</h3>
      <span class="show-card__content">${realContent}</span>
      <span class="show-card__author">${author}</span>
    </div>
    <div class="show-card__icons">
      <button class="show-card__cancel-icon delete">
      <div class="closed"></div>
      </button>
      <button class="show-card__edit-icon">
        <div class="edit"></div>
      </button>
    </div>`;
  return cardElement;
}

export function createRecordForm(record) {
  let textBody = addTextOnAction(
    record.action,
    record.title,
    record.fromColumn,
    record.toColumn
  );
  const recordElement = document.createElement("div");
  recordElement.classList.add("record");
  recordElement.innerHTML = `<img src="${record.photo}" class="userImage" />
    <div class="historyItem">
      <div class="userName">${record.userName}</div>
      <div class="textBody">
        ${textBody}
      </div>
      <div class="timeStamp">${record.timeStamp}</div>
    </div>
  </div>`;
  return recordElement;
}

function addTextOnAction(action, title, fromColumn, toColumn) {
  let text = "";
  switch (action) {
    case "ADD_CARD":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br />등록 <span> 하였습니다. </span>`;
      return text;
    case "REMOVE_CARD":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br />삭제 <span> 하였습니다. </span>`;
      return text;
    case "UPDATE_CARD":
      text = `${title} <span> 을(를)</span> 변경 <span> 하였습니다. </span>`;
      return text;
    case "MOVE_CARD":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br /> ${toColumn}  <span> 으로 </span> 이동 <span> 하였습니다. </span>`;
      return text;
  }
}

export function createAddCardForm() {
  const addCardForm = document.createElement("div");
  addCardForm.classList.add("add-card");
  addCardForm.innerHTML = `<div class="add-card__input">
    <input type="text" class="add-card__input__title" placeholder="제목을 입력하세요"/>
    <textarea class="add-card__input__content" rows="1" maxlength="500" onclick = "resizeHeight(this)"
      oninput="resizeHeight(this); checkContentLength(this);" placeholder="내용을 입력하세요"
      wrap="hard"></textarea>
  </div>
  <div class="add-card__buttons">
    <button class="add-card__cancel-btn">취소</button>
    <button type="submit" class="add-card__submit-btn">등록</button>
  </div>
  </div>`;
  return addCardForm;
}
