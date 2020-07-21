const todosForm = document.querySelector('#todosForm')
const todosTab = document.querySelector('.todos')
const todoInput = document.querySelector('.input.todo')
const clearBtn = document.querySelector('.clear-todos')

todosForm.onsubmit = addTodo
todosTab.onclick = removeTodo
clearBtn.onclick = clearTodos
document.addEventListener('DOMContentLoaded', getTodos)

function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    monitorClearButton()

    todos.forEach(todo => {
        const todoContainer = `
                <div class="todo">
                    <span>${todo}</span>
                    <div class="task-controls">
                        <button class="edit" title="Edit todo"><i class="fas fa-edit"></i></button>
                        <button class="delete" title="Delete todo"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `

        todosTab.innerHTML += todoContainer
    })
}

function addTodo(e) {
    e.preventDefault()

    if (todoInput.value === '') {
        alert('Add a todo')
    }

    const todoContainer = `
            <div class="todo">
                <span>${todoInput.value}</span>
                <div class="task-controls">
                    <button class="edit" title="Edit todo"><i class="fas fa-edit"></i></button>
                    <button class="delete" title="Delete todo"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `

    todosTab.innerHTML += todoContainer
    storeTodoInLocalStorage(todoInput.value)
    todoInput.value = ''
    monitorClearButton()
}

function storeTodoInLocalStorage(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeTodo(e) {
    if (e.target.parentElement.classList.contains('delete')) {

        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.parentElement.remove()
            removeTodoFromLocalStorage(e.target.parentElement.parentElement.parentElement)
        }
    }
}

function removeTodoFromLocalStorage(todoItem) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach((todo, index) => {
        if (todoItem.textContent.trim() === todo) {
            todos.splice(index, 1)
        }
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

function clearTodos() {
    if (confirm('Are you sure?')) {
        while (todosTab.firstChild) {
            todosTab.removeChild(todosTab.firstChild)
        }
        clearTodosFromLocalStorage()
    }
}

function clearTodosFromLocalStorage() {
    localStorage.clear()
    monitorClearButton()
}

function monitorClearButton() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    if (todos.length > 1) {
        clearBtn.style.display = 'block'
    } else {
        clearBtn.style.display = 'none'
    }

}

(() => {
    let todos = ['Todo 1', 'Todo 2', 'Todo 3']
    localStorage.setItem('todos', JSON.stringify(todos))
})()
