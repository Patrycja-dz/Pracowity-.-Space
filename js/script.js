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
        render();
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
        render();
    };

    const removeTasks = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]
        render();
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
        render();
    };
    const hideAllDoneTasks = () => {
        hideTaskDone = !hideTaskDone;
        render();
    }
    const renderTask = () => {
        let htmlGenerateString = "";
        for (const task of tasks) {
            htmlGenerateString += `
            <li 
              class="list__item${task.done && hideTaskDone ? " list__task--hidden" : ""}"
            >
              <button class="list__button list__button--done js-done">
              ${task.done ? "✓" : ""}</button>
              
               <span class="list__task${task.done ? " list__task--done":""}">
               ${task.newTaskContent}
               </span>
               <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `

        };
        document.querySelector(".js-tasks").innerHTML = htmlGenerateString;
        addEvents();
    };
    const renderButtons = () =>{
        let htmlBtn ="";
        if(!tasks.length){
            htmlBtn.innerHTML = "";
            return;
        }
        if(tasks.length > 0){
            htmlBtn += `
            <button class = "buttons__btnElement js-hideAllTaskDone">${hideTaskDone ? "Pokaż" : "Ukryj"} ukończone </buttons>
            <button class = "buttons__btnElement js-markAllTaskDone" ${tasks.every(task => !task.done) ? "" : " disabled"}> Ukończ wszystkie </button> 
            `
        };
        document.querySelector(".js-buttons").innerHTML = htmlBtn;
        bindEventsToButtons();
    }

    // const renderButtons = () => {
    //     const buttonsGenerateInHtml = document.querySelector(".js-buttons");

    //     if (!tasks.length) {
    //         buttonsGenerateInHtml.innerHTML = "";
    //         return;
    //     }
    //     buttonsGenerateInHtml.innerHTML += `
    //         <button class = "buttons__btnElement js-hideAllTaskDone">${hideTaskDone ? "Pokaż" : "Ukryj"} ukończone </buttons>
    //         <button class = "buttons__btnElement js-markAllTaskDone" ${tasks.every(task => !task.done) ? " disabled" : ""}> Ukończ wszystkie </button> 
    //         `;
          
    // };

//     let htmlGenerateButtons = null;
// if(tasks.length > 0){
//     htmlGenerateButtons +=`
//     <button 
//        class = "buttons__btnElement js-hideAllTaskDone"
//     >${hideTaskDone ? "Pokaż" : "Ukryj"} ukończone
//     </buttons>
//     <button 
//        class = "buttons__btnElement js-markAllTaskDone" ${ tasks.every(({done}) => done) ? " disabled" : ""}
//     >
//      Ukończ wszystkie
//     </button>
//     `
//     };
//     document.querySelector(".js-buttons").innerHTML = htmlGenerateButtons;
// };

const bindEventsToButtons = () => {
    const markAllTaskDoneButton = document.querySelector(".js-markAllTaskDone");
    if (markAllTaskDoneButton) {
        markAllTaskDoneButton.addEventListener("click", markAllTaskDone)
    };
    const hideAllTaskDoneButton = document.querySelector(".js-hideAllTaskDone");
    if (hideAllTaskDoneButton) {
        hideAllTaskDoneButton.addEventListener("click", hideAllDoneTasks);
    }
   
}

const render = () => {
    addEvents();
    renderTask();
    renderButtons();
    bindEventsToButtons();
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
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
};
init();
};