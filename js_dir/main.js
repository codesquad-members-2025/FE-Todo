const headers = document.querySelectorAll(".columnlist__col");
const btns = Array.from(headers).map((header) => {
  const addBtn = header.querySelector(".add-task-btn");
  const closeBtn = header.querySelector(".delete-task-btn");
  return [addBtn, closeBtn];
});

/*

const addBtns = document.querySelectorAll(".add-task-btn");

addBtns.forEach((btn)=>{
    btn.addEventListener("click",(event)=>{
        const section = event.target.closest("columnlist__col")

    })
})
*/
