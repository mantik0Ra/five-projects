const todoInput = document.querySelector(".input");
const todoForm = document.querySelector(".form");
const todoList = document.querySelector(".todoList")

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
    todos.forEach((it) => {
        addToDo(it);
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addToDo();
});

function addToDo(todo) {
    let todoText = todoInput.value

    if(todo) {
        todoText = todo.text
    }
    
    

    if(todoText) {
        let li = document.createElement("li")
        li.innerHTML = todoText
        todoList.appendChild(li)

        li.addEventListener("click", (e) => {
            e.target.classList.toggle("complete"); 
            updateLS();
        });

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            li.remove();
            updateLS();
        });
    }
    updateLS();
    todoInput.value = ""
}

function updateLS() {
    const todoLi = document.querySelectorAll("li");

    const todos = [];

    todoLi.forEach((elem) => {
        todos.push({
            text: elem.innerText,
            completed: elem.classList.contains("complete"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

