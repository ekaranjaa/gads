// New todo form
const addTodoForm = document.querySelector('#addTodos')
const newTodoInput = document.querySelector('#addTodos .input.todo')

// Edit todo form
const editTodoForm = document.querySelector('#editTodos')
const editTodoIndex = document.querySelector('#editTodos .todo-index')
const editTodoInput = document.querySelector('#editTodos .input.todo')

// Todos tab
const todosTab = document.querySelector('.todos')

addTodoForm.onsubmit = addTodo
editTodoForm.onsubmit = updateTodo
todosTab.onclick = (e) => {
    e.preventDefault()

    if (e.target.parentElement.classList.contains('edit')) {
        editTodo(e.target.parentElement.parentElement.parentElement)
    }

    if (e.target.parentElement.classList.contains('delete')) {
        removeTodo(e.target.parentElement.parentElement.parentElement)
    }
}


function inspectTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    if (todos.length > 0) {
        todosTab.classList.remove('empty')
    } else {
        todosTab.classList.add('empty')
        todosTab.innerHTML = `
            <div class="emptyContent">
                <i class="fas fa-tasks"></i>
                <p>You have no todos yet</p>
            </div>
        `
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
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
    }, 3000)
})

function addTodo(e) {
    e.preventDefault()

    if (newTodoInput.value === '') {
        alert('Add a todo')
    } else {
        const todoContainer = `
            <div class="todo">
                <span>${newTodoInput.value}</span>
                <div class="task-controls">
                    <button class="edit" title="Edit todo"><i class="fas fa-edit"></i></button>
                    <button class="delete" title="Delete todo"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `

        todosTab.innerHTML += todoContainer
        storeTodoInLocalStorage(newTodoInput.value)
        addTodoForm.classList.remove('active')
        document.querySelector('.content').classList.remove('overlay')
        newTodoInput.value = ''
        inspectTodos()
    }
}

function editTodo(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    editTodoForm.classList.toggle('active')
    document.querySelector('.content').classList.toggle('overlay')
    editTodoIndex.value = todos.indexOf(todo.innerText.trim())
    editTodoInput.value = todo.innerText.trim()
}

function updateTodo(e) {
    e.preventDefault()

    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    if (editTodoInput.value === '') {
        alert('The field can\'t be empty')
    } else {
        const oldTodo = document.querySelectorAll('div.todo')[editTodoIndex.value]
        const newTodo = document.createElement('div')
        newTodo.className = 'todo'
        newTodo.innerHTML = `
            <span>${editTodoInput.value}</span>
            <div class="task-controls">
                <button class="edit" title="Edit todo"><i class="fas fa-edit"></i></button>
                <button class="delete" title="Delete todo"><i class="fas fa-trash-alt"></i></button>
            </div>
        `
        todosTab.replaceChild(newTodo, oldTodo)

        todos[editTodoIndex.value] = editTodoInput.value
        localStorage.setItem('todos', JSON.stringify(todos))

        editTodoForm.classList.remove('active')
        document.querySelector('.content').classList.toggle('overlay')
        editTodoIndex.value = ''
        editTodoInput.value = ''
    }
}

function removeTodo(todo) {
    if (confirm('Are You Sure?')) {
        todo.remove()
        removeTodoFromLocalStorage(todo)
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
