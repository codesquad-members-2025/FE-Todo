export function fetchData() {
  fetch("../data/data.json") // json파일 가져오기
    .then((response) => response.json()) // json형식으로
    .then((data) => {
      cardView(data); // 불러온 데이터를 처리하기
      historyView(data);
    })
    .catch((error) => console.error("오류 발생:", error));
}

function cardView(data) {
  data.colums.forEach((colum) => {
    if (colum.id === "toDo") {
      generateCardsFromList(colum);
    } else if (colum.id === "doing") {
      generateCardsFromList(colum);
    } else if (colum.id === "done") {
      generateCardsFromList(colum);
    }
  });
}

function generateCardsFromList(colum) {
  let index = -1;
  if (colum.id === "toDo") index = 0;
  else if (colum.id === "doing") index = 1;
  else if (colum.id === "done") index = 2;
  let count = 0;
  const id = document.querySelector(`.${colum.id}-cardList`);
  let countCard = document.getElementsByClassName("count_card")[index];
  colum.cardList.forEach((cardData) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("show-card");
    const contentWithLineBreak = cardData.content.replace(/\n/g, "<br>");
    cardElement.innerHTML = `<div class="show-card__total">
      <h3 class="show-card__title">${cardData.title}</h3>
      <span class="show-card__content">${contentWithLineBreak}</span>
      <span class="show-card__author">${cardData.author}</span>
    </div>
    <div class="show-card__icons">
      <button class="show-card__cancle-icon">
        <svg
          class="closed_button"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.2 12L0 10.8L4.8 6L0 1.2L1.2 0L6 4.8L10.8 0L12 1.2L7.2 6L12 10.8L10.8 12L6 7.2L1.2 12Z"
          />
        </svg>
      </button>
      <button class="show-card__edit-icon">
        <svg
          class="edit_button"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.727 2.72708L10.9642 1.48991C11.1194 1.33459 11.3038 1.21139 11.5066 1.12733C11.7095 1.04327 11.927 1 12.1466 1C12.3662 1 12.5836 1.04327 12.7865 1.12733C12.9894 1.21139 13.1737 1.33459 13.329 1.48991L14.511 2.67191C14.8244 2.98542 15.0005 3.41059 15.0005 3.8539C15.0005 4.29722 14.8244 4.72238 14.511 5.0359L13.2738 6.27306M9.727 2.72708L1.68877 10.7645C1.41122 11.042 1.24018 11.4084 1.2056 11.7994L1.00331 14.0898C0.992444 14.2115 1.00842 14.3342 1.0501 14.4491C1.09178 14.564 1.15816 14.6684 1.24456 14.7549C1.33096 14.8414 1.43528 14.9078 1.55016 14.9496C1.66503 14.9914 1.78768 15.0075 1.90945 14.9968L4.19988 14.7945C4.59145 14.7603 4.95845 14.5892 5.23642 14.3113L13.2738 6.27306M9.727 2.72708L13.2738 6.27306"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>`;
    count++;
    id.appendChild(cardElement);
  });
  countCard.textContent = count;
}

function historyView(data) {
  const recordHistory = document.getElementById("recordHistory");
  data.historyList.forEach((record) => {
    // let action = record.action;
    // let title = record.title;
    // let fromColumn = record.fromColumn;
    // let toColumn = record.toColumn;
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
    recordHistory.appendChild(recordElement);
  });
}

function addTextOnAction(action, title, fromColumn, toColumn) {
  let text = "";
  switch (action) {
    case "add":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br />등록 <span> 하였습니다. </span>`;
      return text;
    case "remove":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br />삭제 <span> 하였습니다. </span>`;
      return text;
    case "update":
      text = `${title} <span> 을(를)</span> 변경 <span> 하였습니다. </span>`;
      return text;
    case "move":
      text = `${title} <span> 을(를)</span> ${fromColumn} <span> 에서 </span><br /> ${toColumn}  <span> 으로 </span> 이동 <span> 하였습니다. </span>`;
      return text;
  }
}

// fetchData();
