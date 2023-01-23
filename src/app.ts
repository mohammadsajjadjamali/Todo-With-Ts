interface TodoInterface {
    id: number;
    title: string;
    status: boolean;
}

class Todo implements TodoInterface {
    id: number;
    title: string;
    status: boolean;

    constructor(todo: TodoInterface) {
        this.id = todo.id;
        this.title = todo.title;
        this.status = todo.status;
    }
}

class UI {
    addTodoToList(todo: TodoInterface) {
        const list = document.getElementById("todo-list")!;

        const tr = document.createElement("tr");
        tr.innerHTML = `
                        <th>${todo.id}</th>
                        <td>${todo.title}</td>
                        <td><input type="checkbox" ${
                            todo.status ? "checked" : ""
                        } class="form-check-input" onclick="Store.changeStatusTodo(${todo.id})" ></td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="ui.removeTodo(event, ${todo.id})">delete</button></td>
                        `;

        list.appendChild(tr);
    }

    removeTodo(e: Event, id: number) {
        const element = e.target as HTMLElement;

        element.parentElement!.parentElement!.remove();

        Store.removeTodo(id)

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
    static getTodos(): TodoInterface[] {
        let todos: TodoInterface[];

        if (localStorage.getItem("todos")) {
            todos = JSON.parse(localStorage.getItem("todos")!);
        } else {
            todos = [];
        }

        return todos;
    }

    static displayTodos(){
        const todos = Store.getTodos();

        const ui = new UI();

        todos.forEach((todo) => {
            ui.addTodoToList(todo)
        })
    }

    static addTodo(todo: TodoInterface) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    static removeTodo(id: number){
        const todos = Store.getTodos();
        const newTodos = todos.filter((todo) => todo.id !== id);

        localStorage.setItem("todos", JSON.stringify(newTodos));
    }

    static changeStatusTodo(id: number){
        const todos = Store.getTodos();
        const newTodos = todos.map((todo) => todo.id === id ? { ...todo, status: !todo.status } : todo);

        localStorage.setItem("todos", JSON.stringify(newTodos));
    }
}

const form = document.getElementById("todo-form") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const titleError = document.getElementById(
    "title-error"
) as HTMLParagraphElement;

const ui = new UI();

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    if (title.value.trim() === "") {
        titleError.innerHTML = "Title is required...";
    } else {
        titleError.innerHTML = "";
        const todoObj: TodoInterface = {
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