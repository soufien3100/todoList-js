import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');

const todos = [{
        text: 'je suis un text ',
        done: false,
        editMode: true
    },
    {
        text: 'faire du javascript',
        done: true,
        editMode: false
    }
];

/**** recuperer la valeur de l'input  */

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    addTodo(value);
});

/***** affichage */

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        if (todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = '';
    ul.append(...todosNode);
};

/***creer un element */

const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "supprimer";
    const buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = 'Edit';
    buttonDelete.addEventListener('click', event => {
        event.stopPropagation();
        deleteTodo(index);

    });
    buttonEdit.addEventListener('click', event => {
        event.stopPropagation();
        toggleEditMode(index);
    })
    li.innerHTML = `    
            <span class="todo ${todo.done ? 'done' :''} "></span>
            <p>${todo.text}</p>
        `;

    li.addEventListener('click', event => {
        toggleTodo(index);
    });
    li.append(buttonEdit, buttonDelete);
    return li;
};

/**** ajouter un objet dans le todos */

function addTodo(text) {
    todos.push({
        text,
        done: false
    });
    displayTodo();
}

/**** supprimer un element par l'index  */

const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
};

/***** modifier le status de todo */

const toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
};
const toggleEditMode = index => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}
const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    const buttonSave = document.createElement("button");
    buttonSave.innerHTML = "Save";
    const buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Cancel";
    buttonCancel.addEventListener("click", event => {
        event.stopPropagation();
        toggleEditMode(index);
    });
    buttonSave.addEventListener("click", event => {
        editTodo(index, input);
    });
    li.append(input, buttonCancel, buttonSave);
    return li;
};

const editTodo = (index, input) => {
    todos[index].text = input.value;
    todos[index].editMode = false;
    displayTodo();
};

displayTodo();