// Column 컴포넌트 생성
function createColumn(id, title, taskCount) {
  return `
  <section class="column flex-col" id="${id}">
    <div class="column-area">
      <div class="column-area-left flex-item-center">
        <h2 class="text-bold tx-b16">${title}</h2>
        <div class="number-box flex-item-center">
          <span class="text-weak tx-m12">${taskCount}</span>
        </div>
      </div>
      <div class="column-area-right">
        <button class="card-add-btn" aria-label="Add task">
          <div class="plus-icon svg-24 svg-color-weak" role="img" aria-label="Add a new task"></div>
        </button>
        <button aria-label="Delete column">
          <div class="closed-icon svg-24 svg-color-weak" role="img" aria-label="Delete this column"></div>
        </button>
      </div>
    </div>
    <div class="card-list flex-col">
      ${cardForm}
      <div class="card-container flex-col">
        <!-- 카드 항목은 여기서 동적으로 추가 -->
      </div>
    </div>
  </section>
`;
}

const cardForm = `
  <article class="card-form card-common flex-col" style="display: none">
  <div class="content-section flex-col">
    <input type="text" class="form-input text-strong tx-m14" placeholder="제목을 입력하세요" value="">
    <textarea class="form-textarea text-default tx-m14" placeholder="내용을 입력하세요" value=""></textarea>
  </div>
  <div class="button-section">
    <button class="form-cancel-btn form-common-btn text-default tx-b14">
      <span>취소</span>
    </button>
    <button class="form-create-btn form-common-btn text-white tx-b14">
      <span>저장</span>
    </button>
  </div>
</article>

`;

// Task 카드 컴포넌트 생성
function createTaskCard(id, title, content, author) {
  return `
  <article class="todo-card card-common" id="${id}">
    <div class="content-section flex-col">
      <h3 class="text-strong tx-b14">${title}</h3>
      <p class="text-default tx-m14">${content}</p>
      <h6 class="text-weak tx-m12">author by ${author}</h6>
    </div>
    <div class="button-section flex-col">
      <button class="delete-card-btn" aria-label="Delete task">
        <div class="closed-icon svg-24 svg-color-weak" role="img" aria-label="Delete this task"></div>
      </button>
      <button class="edit-card-btn" aria-label="Edit task">
        <div class="edit-icon svg-24 svg-color-weak" role="img" aria-label="Edit this task"></div>
      </button>
    </div>
  </article>
`;
}

function createActivityRecord(username, profileImage, actionText, timestamp) {
  return `  
    <article class="activity-record">
      <div class="record-header">
        <img
          src="${profileImage}"
          alt="사용자 프로필 이미지"
          class="profile-img"
        />
      </div>
      <section class="content">
        <h2 class="username tx-m14 text-default">@${username}</h2>
        <p class="action-text tx-m14 text-default">
          ${actionText}
        </p>
        <p class="timestamp tx-m12 text-weak">
          <time>${timestamp} 전</time>
        </p>
      </section>
    </article>
  `;
}

export { createColumn, createTaskCard, createActivityRecord };
