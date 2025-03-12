import { data } from "../data/data.js";

function historyView() {
  console.log(data.history);
  const recordHistory = document.getElementById("recordHistory");
  data.historyList.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.classList.add("record");
    recordElement.innerHTML = `<img src="${record.photo}" class="userImage" />
    <div class="historyItem">
      <div class="userName">${record.userName}</div>
      <div class="textBody">
        ${record.textBody}
      </div>
      <div class="timeStamp">${record.timeStamp}</div>
    </div>
  </div>`;
    recordHistory.appendChild(recordElement);
  });
}

historyView();
