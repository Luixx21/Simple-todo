function saveJson() {
    let todoList = JSON.parse(localStorage.getItem("todo"));

    const file = new Blob([JSON.stringify(todoList)], { type: "application/json" });
    saveAs(file, "todolist.json");
    console.log("Successfully saved JSON to file");
}

function uploadJson() {
    var structure = JSON.parse(document.getElementById("structure-input").value);

    localStorage.setItem("todo", JSON.stringify(structure));
    console.log("Successfully uploaded JSON");
    location.reload()
}

function completeTask(index) {
    let todoList = JSON.parse(localStorage.getItem("todo")) || [];

    if (!todoList[index]) return;

    todoList[index].status = "Completed";

    localStorage.setItem("todo", JSON.stringify(todoList));
    alert("Task completed successfully!");
    location.reload();
}
function updateTask(index) {
    let todoList = JSON.parse(localStorage.getItem("todo")) || [];

    if (!todoList[index]) return;

    var date = todoList[index].date;

    todoList[index] = {
        title: document.getElementById(`task-${index}-title`).value,
        notes: document.getElementById(`task-${index}-notes`).value,
        deadline: document.getElementById(`task-${index}-deadline`).value,
        status: document.getElementById(`task-${index}-status`).value,
    };

    todoList[index].date = date;

    localStorage.setItem("todo", JSON.stringify(todoList));
    alert("Task updated successfully!");
}
function removeTask(index) {
    let todoList = JSON.parse(localStorage.getItem("todo")) || [];

    if (!todoList[index]) return;

    todoList.splice(index, 1);

    localStorage.setItem("todo", JSON.stringify(todoList));
    location.reload(); // Recarrega a página para atualizar a lista
}
function createList() {
    const list = document.getElementById("task-list");
    let todoList = JSON.parse(localStorage.getItem("todo")) || [];
    
    if (todoList.length > 0) {
        todoList.forEach((task, index) => {
            let taskDiv = document.createElement("div");
            taskDiv.id = `task-${index}`;
    
            taskDiv.innerHTML = `
                <fieldset>
                    <legend>Task ${index + 1}</legend>
                    <label for="task-${index}-title">
                        Title
                        <input id="task-${index}-title" value="${task.title}">
                    </label>
                    <label for="task-${index}-notes">
                        Notes
                        <input id="task-${index}-notes" value="${task.notes}">
                    </label>
                    <label for="task-${index}-date">
                        Created at
                        <input type="date" id="task-${index}-date" value="${task.date}" disabled>
                    </label>
                    <label for="task-${index}-deadline">
                        Deadline
                        <input type="date" id="task-${index}-deadline" value="${task.deadline}">
                    </label>
                    <label for="task-${index}-status">
                        Status
                        <select id="task-${index}-status">
                            <option value="To complete" ${task.status === "To complete" ? "selected" : ""}>To complete</option>
                            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                        </select>
                    </label>
                </fieldset>
                <button class="complete-task" data-index="${index}">Completed?</button>
                <button class="update-task" data-index="${index}">Update</button>
                <button class="remove-task" data-index="${index}">Remove</button>
            `;
    
            list.appendChild(taskDiv);
        });

        document.querySelectorAll(".complete-task").forEach((button) => {
            button.addEventListener("click", (event) => {
                let index = event.target.dataset.index;
                completeTask(index);
            });
        });
    
        document.querySelectorAll(".update-task").forEach((button) => {
            button.addEventListener("click", (event) => {
                let index = event.target.dataset.index;
                updateTask(index);
            });
        });
    
        document.querySelectorAll(".remove-task").forEach((button) => {
            button.addEventListener("click", (event) => {
                let index = event.target.dataset.index;
                removeTask(index);
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    createList();

    document.getElementById("download-todo").addEventListener("click", () => {
        saveJson();
    });

    document.getElementById("upload-json").addEventListener("click", () => {
        uploadJson();
    });

    document.getElementById("add-task").addEventListener("click", () => {
        let todoList = JSON.parse(localStorage.getItem("todo")) || [];
    
        let task = {
            title: document.getElementById("task-title").value,
            date: new Date().toISOString().split("T")[0],
            notes: document.getElementById("task-notes").value,
            deadline: document.getElementById("task-deadline").value,
            status: "To complete",
        };
    
        todoList.push(task);
    
        localStorage.setItem("todo", JSON.stringify(todoList));
        location.reload(); // Recarrega a página para exibir a nova tarefa
    });
});
