const todosForm = document.querySelector('#todosForm')
const todosTab = document.querySelector('.todos')
const todoInput = document.querySelector('.input.todo')
const clearBtn = document.querySelector('.clear-todos')

todosForm.onsubmit = addTodo
todosTab.onclick = removeTodo
clearBtn.onclick = clearTodos
document.addEventListener('DOMContentLoaded', getTodos)

function inspectTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    if (todos.length > 0) {
        todosTab.classList.remove('empty')
        clearBtn.style.display = 'block'
    } else {
        todosTab.classList.add('empty')
        clearBtn.style.display = 'none'
    }
}

function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    inspectTodos()

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
    } else {
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
        todosForm.classList.toggle('active')
        document.querySelector('.content').classList.toggle('overlay')
        todoInput.value = ''
        inspectTodos()
    }
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
            inspectTodos()
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

// Got issues :/
function clearTodos() {
    if (confirm('Are you sure?')) {
        while (todosTab.firstChild) {
            todosTab.removeChild(todosTab.firstChild)
        }
        clearTodosFromLocalStorage()
        inspectTodos()
    }
}

function clearTodosFromLocalStorage() {
    localStorage.clear()
}
