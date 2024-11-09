const API_URL="https://jsonplaceholder.typicode.com/todos?_limit=5";

const todoList = document.getElementById("todo-List");
const addtaskbtn = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");

async function fetchTodos(){
    try{
        const response = await fetch(API_URL);
        const todos = await response.json();
        todos.forEach(addTaskToDOM); 
    }catch(error){ 
        console.error("Error fetching todos:",error);
    }
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.className = task.completed ? "completed" : "";
  
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleComplete(${task.id})">☑</button>
        <button onclick="deleteTask(${task.id})">☒</button>
      </div>
    `;
  
    todoList.appendChild(li);
  }

  function addTask() {
    const taskTitle = newTaskInput.value.trim();
    if (taskTitle === "") return;
  
    const task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
  
    addTaskToDOM(task);
    newTaskInput.value = "";
  }


  
  function toggleComplete(id) {
    const taskItem = document.querySelector(`li[data-id="${id}"]`);
    if (taskItem) {
      taskItem.classList.toggle("completed");
    }
  }

  function deleteTask(id) {
    const taskItem = document.querySelector(`li[data-id="${id}"]`);
    if (taskItem) {
      todoList.removeChild(taskItem);
    }
  }

  addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

fetchTodos();