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
                        <td><input type="checkbox" ${todo.status ? "checked" : ""} class="form-check-input"></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="ui.removeTodo(event)">delete</button></td>
                        `;
        list.appendChild(tr);
    }
    removeTodo(e) {
        const element = e.target;
        element.parentElement.parentElement.remove();
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
        title.value = '';
    }
});
