let todoList = [];
let currentFilter = "all";

function validateInput(){
    const todoInput = document.getElementById("todo-input").value;
    const todoDate = document.getElementById("date-input").value;
    if(todoInput === "" || todoDate === ""){
        alert("Please enter both todo and due date");
    }
    else{
        addTodo(todoInput, todoDate);
    }
}

function addTodo(todo, dueDate){
    const todoItem = {
        task: todo,
        dueDate: dueDate,
        completed: false
    };
    todoList.push(todoItem);
    renderTodoList();
}

function setFilter(filter) {
    currentFilter = filter;
    filterTodo();
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function deleteAllTasks(){
    todoList = [];
    renderTodoList();
}

function toggleComplete(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}

// 🔹 fungsi filter berdasarkan dropdown
function filterTodo() {
  const filterValue = document.getElementById('statusFilter').value;
  let filtered = [];

  if (filterValue === "all") {
      filtered = todoList;
  } else if (filterValue === "completed") {
      filtered = todoList.filter(item => item.completed);
  } else if (filterValue === "active") {
      filtered = todoList.filter(item => !item.completed);
  }

  renderTodoList(filtered);
}

// 🔹 render list bisa terima parameter filter
function renderTodoList(listToRender = todoList){
    const todoListContainer = document.getElementById("todo-list");
    todoListContainer.innerHTML = '';

    if (listToRender.length === 0) {
        todoListContainer.innerHTML = `<li class="text-gray-400">Tidak ada tugas</li>`;
        return;
    }

    listToRender.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-white shadow rounded-lg px-3 py-2 mb-2";

        li.innerHTML = `
          <span class="${item.completed ? 'line-through text-gray-400' : ''}">
            ${item.task} - <em>${item.dueDate}</em>
          </span>
          <div class="flex gap-2">
            <button onclick="toggleComplete(${index})" class="bg-green-500 text-white px-2 py-1 rounded">
              ${item.completed ? '↩️ Undo' : '✅ Done'}
            </button>
            <button onclick="deleteTodo(${index})" class="bg-red-500 text-white px-2 py-1 rounded">❌</button>
          </div>
        `;

        todoListContainer.appendChild(li);
      });
}