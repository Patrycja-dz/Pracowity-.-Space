{
    let tasks = [];
    let hideTaskDone = false;
    const focusInput = () => {
        const newTaskFocus = document.querySelector(".js-newTask").focus();
        if (newTaskFocus == "") {
            newTaskFocus.focus()
        }
    }
    const resetInput = () => {
        const resetField = document.querySelector(".js-newTask");
        resetField.value = "";
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                newTaskContent,
            }
        ];
        focusInput();
        resetInput();
        renderTask();
    };

    const doneTask = (editIndex) => {
        tasks = [
            ...tasks.slice(0, editIndex),
            {
                ...tasks[editIndex],
                done: !tasks[editIndex].done,
            },
            ...tasks.slice(editIndex + 1)
        ];
        renderTask();
    };

    const removeTasks = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]
        renderTask();
    };

    const addEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTasks(taskIndex);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                doneTask(taskIndex);
            })
        })
    };
    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }))
        renderTask();
    };
    const hideAllDoneTasks = () => {
        hideTaskDone = !hideTaskDone;
        renderTask();
    }
    const renderTask = () => {
        const taskToHtml = (task) => {
            `<li 
                  class="list__item${task.done && hideTaskDone} ? " list__task--hidden" : ""> js-tasks"
                >
                  <button class="list__button list__button--done js-done">
                  ${task.done ? "✓" : ""}</button>
                  
                   <span class="list__task${task.done ? " list__task--done":""}">
                   ${task.newTaskContent}
                   </span>
                   <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
                `
        }

        const taskHtmlElement = document.querySelector(".js-tasks");
        taskHtmlElement.innerHTML = tasks.map(taskToHtml).join("");
    };
    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        if (task.length === 0) {
            buttonsElement.innerHTML = "";
            return
        }
        buttonsElement.innerHTML = `
        <button 
           class = "buttons__btnElement js-hideAllTaskDone"
             >${hideTaskDone ? "Pokaż" : "Ukryj"} ukończone
        </buttons>
        <button 
           class = "buttons__btnElement js-markAllTaskDone" ${ tasks.every(({done}) => done) ? " disabled" : ""}
        >
         Ukończ wszystkie
        </button>
        
        
        `
    }


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