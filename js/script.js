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
        renderTask();
    };
    const doneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        renderTask();
    }
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        renderTask();
    }
    const renderTask = () => {
        let htmlGenerateString = "";
        for (const task of tasks) {
            htmlGenerateString += `
            <li class = "list__item${task.done ? " list__item--done" : ""}">
            <span class="list__task">${task.content}</span>
            <button class="list__button js-done">d</button>
        
            <button class="list__button js-remove">r</button>
            </li>`
        }
        document.querySelector(".js-tasks").innerHTML = htmlGenerateString;
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                doneTask(taskIndex);
            })
        })

    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent == "") {
            return;
        };
        addNewTask(newTaskContent);
    };
    const init = () => {
        renderTask();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
};