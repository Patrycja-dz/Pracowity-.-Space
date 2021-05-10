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
    const init = () => {
        renderTask();
    };
    init();
}