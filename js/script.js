{
    const tasks = [];
    const addNewTask =(newTaskContent)=>{
        
    }
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class ="list__item${task.done ? " list__item--done":""}">
            <button class="list__button js-done"><i class="fas fa-check"></i></button>
            ${task.content}
            <button class="list__button js-remove"><i class="fas fa-trash"></i></button>
            </li>`
            document.querySelector(".js-tasks").innerHTML = htmlString;
        }
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
    }
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }
    init();
}