{
    const tasks = [{
            content: "Obejrzeć serial",
            done: false,
        },
        {
            content: "zjeść obiad",
            done: true,
        },
    ];
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
        renderTask()
    }
    const renderTask = () => {
        let htmlGenerateString = "";
        for (const task of tasks) {
            htmlGenerateString += `
            <li class = "list__item${task.done ? " list__item--done" : ""}">
            ${task.content}
            </li>`
        }
        document.querySelector(".js-tasks").innerHTML = htmlGenerateString;
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent == "") {
            return;
        }
        addNewTask(newTaskContent);
    }
    const init = () => {
        renderTask();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}