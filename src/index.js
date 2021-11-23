import "./style.css";

const ul = document.querySelector('ul');

const todos = [{
        text: 'je suis un text ',
        done: false
    },
    {
        text: 'faire du javascript',
        done: true
    }
];

const displayTodos = () => {
    const todosNode = todos.map((todo, index) => {
        return createElementTodo(todo, index);
    });
    ul.innerHTML = '';
    ul.append(...todosNode);

};
const createElementTodo = (todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
            <span class="todo ${todo.done ? 'done' :''} "></span>
            <p>${todo.text}</p>
            <button>supprimer</button>
        `;
    return li;
};
displayTodos();