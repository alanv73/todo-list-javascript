let input = document.getElementById("task-input");
let add_btn = document.getElementById("add-task-btn");

window.onload = renderTodo;

let addTask = function () {
    if (input.value.length < 1) {
        return;
    }

    let task = document.createElement("li");

    let newTask = {
        text: input.value,
        completed: false,
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.classList.add("task", "animate__animated", "animate__bounceInUp");
    task.innerHTML = `
    <div class="item-text">${input.value}</div>
    <div class="operation">
    <button class="operation_btn" onclick="completeTask(this)"> <i class="fa-solid fa-check fa-lg" id="complete-task"></i></button> 
    <button class="operation_btn" onclick="updateTask(this)">  <i class="fa-solid fa-pen fa-lg" id="update-task"></i></button> 
    <button class="operation_btn" onclick="cancelTask(this)"> <i class="fa-solid fa-circle-xmark fa-lg" id="cancel-task"></i></button> 
    </div>
    `;

    document.getElementById("task-list").appendChild(task);

    input.value = "";
};

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

add_btn.addEventListener("click", () => {
    addTask();
});

function renderTodo() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let x = 0; x < tasks.length; x++) {
        let task = document.createElement("li");
        task.classList.add("task");

        if (tasks[x].completed === false) {
            task.innerHTML = `
        <div class="item-text">${tasks[x].text}</div>
        <div class="operation">
         <button class="operation_btn" onclick="completeTask(this)"> <i class="fa-solid fa-check fa-lg" id="complete-task"></i></button> 
         <button class="operation_btn" onclick="updateTask(this)">  <i class="fa-solid fa-pen fa-lg" id="update-task"></i></button> 
         <button class="operation_btn" onclick="cancelTask(this)"> <i class="fa-solid fa-circle-xmark fa-lg" id="cancel-task"></i></button> 
        </div>
      `;
        } else {
            task.innerHTML = `
        <div class="item-text" style="text-decoration:line-through;">${tasks[x].text}</div>
        <div class="operation">
         <button class="operation_btn" onclick="completeTask(this)"> <i class="fa-solid fa-check fa-lg" id="complete-task"></i></button> 
         <button class="operation_btn" onclick="updateTask(this)">  <i class="fa-solid fa-pen fa-lg" id="update-task"></i></button> 
         <button class="operation_btn" onclick="cancelTask(this)"> <i class="fa-solid fa-circle-xmark fa-lg" id="cancel-task"></i></button> 
        </div>
      `;
        }

        document.getElementById("task-list").appendChild(task);
    }
}

function cancelTask(buttonElement) {
    let taskElement = buttonElement.closest(".task");
    let text = buttonElement.closest(".item-text");

    if (taskElement) {
        taskElement.classList.add("animate__animated", "animate__flipOutX");
        taskElement.addEventListener("animationend", () => {
            taskElement.remove();
        });
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let indexToDelete = tasks.findIndex((task) => task.text === taskElement.querySelector(".item-text").textContent);
    if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function completeTask(buttonElement) {
    let taskElement = buttonElement.closest(".task");
    let textElement = taskElement.querySelector(".item-text");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskElement.addEventListener(
        "animationend",
        () => {
            taskElement.classList.remove("animate__animated", "animate__shakeX");
        },
        { once: true }
    );

    taskElement.classList.remove("animate__animated", "animate__bounceInUp");
    taskElement.classList.add("animate__animated", "animate__shakeX");

    let indexToUpdate = tasks.findIndex((task) => task.text === textElement.textContent);

    if (indexToUpdate !== -1 && tasks[indexToUpdate].completed === false) {
        tasks[indexToUpdate].completed = true;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        textElement.style.textDecoration = "line-through";
    } else if (tasks[indexToUpdate].completed === true) {
        tasks[indexToUpdate].completed = false;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        textElement.style.textDecoration = "none";
    }
}

function updateTask(buttonElement) {
    let taskElement = buttonElement.closest(".task");
    let textElement = taskElement.querySelector(".item-text");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskElement.addEventListener(
        "animationend",
        () => {
            taskElement.classList.remove("animate__animated", "animate__pulse");
        },
        { once: true }
    );

    taskElement.classList.remove("animate__animated", "animate__bounceInUp");
    taskElement.classList.add("animate__animated", "animate__pulse");

    let indexToUpdate = tasks.findIndex((task) => task.text === textElement.textContent);

    const updatedTask = prompt("Update your Task:", textElement.textContent);

    if (updatedTask !== null && updatedTask !== "") {
        tasks[indexToUpdate].text = updatedTask;
        textElement.textContent = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
