"use strict";
class Todo {
    constructor(todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.status = todo.status;
    }
}
class UI {
    addTodoToList(todo) {
        const list = document.getElementById("todo-list");
        const tr = document.createElement("tr");
        tr.innerHTML = `
                        <th>${todo.id}</th>
                        <td>${todo.title}</td>
                        <td><input type="checkbox" ${todo.status ? "checked" : ""} class="form-check-input" onclick="Store.changeStatusTodo(${todo.id})" ></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="ui.removeTodo(event, ${todo.id})">delete</button></td>
                        `;
        list.appendChild(tr);
    }
    removeTodo(e, id) {
        const element = e.target;
        element.parentElement.parentElement.remove();
        Store.removeTodo(id);
        // Swal.fire({
        //     title: "Todo deleted",
        //     icon: "error",
        //     showConfirmButton: false,
        //     timerProgressBar: true,
        //     timer: 3000,
        //     toast: true,
        //     position: 'top',
        // })
    }
}
class Store {
    static getTodos() {
        let todos;
        if (localStorage.getItem("todos")) {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        else {
            todos = [];
        }
        return todos;
    }
    static displayTodos() {
        const todos = Store.getTodos();
        const ui = new UI();
        todos.forEach((todo) => {
            ui.addTodoToList(todo);
        });
    }
    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    static removeTodo(id) {
        const todos = Store.getTodos();
        const newTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    }
    static changeStatusTodo(id) {
        const todos = Store.getTodos();
        const newTodos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { status: !todo.status }) : todo);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    }
}
const form = document.getElementById("todo-form");
const title = document.getElementById("title");
const titleError = document.getElementById("title-error");
const ui = new UI();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (title.value.trim() === "") {
        titleError.innerHTML = "Title is required...";
    }
    else {
        titleError.innerHTML = "";
        const todoObj = {
            id: Math.round(Math.random() * 100),
            title: title.value.trim(),
            status: false,
        };
        const todo = new Todo(todoObj);
        ui.addTodoToList(todo);
        Store.addTodo(todo);
        title.value = "";
    }
});
document.addEventListener('DOMContentLoaded', Store.displayTodos);
