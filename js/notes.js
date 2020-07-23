const notesForm = document.querySelector('#notesForm')
const notesTab = document.querySelector('.notes')
const noteTitle = document.querySelector('.input.note-title')
const noteBody = document.querySelector('.input.note-body')

notesForm.onsubmit = addNote
notesTab.onclick = removeNote
document.addEventListener('DOMContentLoaded', getNotes)

function inspectNotes() {
    let notes
    if (localStorage.getItem('notes') === null) {
        notes = []
    } else {
        notes = JSON.parse(localStorage.getItem('notes'))
    }

    if (notes.length > 0) {
        notesTab.classList.remove('empty')
    } else {
        notesTab.classList.add('empty')
    }
}

function getNotes() {
    let notes
    if (localStorage.getItem('notes') === null) {
        notes = []
    } else {
        notes = JSON.parse(localStorage.getItem('notes'))
    }

    inspectNotes()

    notes.forEach(note => {
        const noteContainer = `
                <div class="note">
                    <div class="title">
                        <h3>${note.title}</h3>
                        <div class="task-controls">
                            <button class="edit" title="Edit note"><i class="fas fa-edit"></i></button>
                            <button class="delete" title="Delete note"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class="text">
                        <p>${note.body}</p>
                    </div>
                </div>
            `

        notesTab.innerHTML += noteContainer
    })
}

function addNote(e) {
    e.preventDefault()

    if (noteTitle.value === '' && noteBody.value === '') {
        alert('Add a note')
    } else {
        const noteContainer = `
            <div class="note">
                <div class="title">
                    <h3>${noteTitle.value}</h3>
                    <div class="task-controls">
                        <button class="edit" title="Edit note"><i class="fas fa-edit"></i></button>
                        <button class="delete" title="Delete note"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div class="text">
                    <p>${noteBody.value}</p>
                </div>
            </div>
        `

        notesTab.innerHTML += noteContainer
        storeNoteInLocalStorage({ 'title': noteTitle.value, 'body': noteBody.value })
        notesForm.classList.toggle('active')
        document.querySelector('.content').classList.toggle('overlay')
        noteTitle.value = ''
        noteBody.value = ''
        inspectNotes()
    }
}

function storeNoteInLocalStorage(note) {
    let notes
    if (localStorage.getItem('notes') === null) {
        notes = []
    } else {
        notes = JSON.parse(localStorage.getItem('notes'))
    }

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}

function removeNote(e) {
    if (e.target.parentElement.classList.contains('delete')) {

        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.parentElement.parentElement.remove()
            removeNoteFromLocalStorage(e.target.parentElement.parentElement.parentElement)
            inspectNotes()
        }
    }
}

function removeNoteFromLocalStorage(noteItem) {
    let notes
    if (localStorage.getItem('notes') === null) {
        notes = []
    } else {
        notes = JSON.parse(localStorage.getItem('notes'))
    }

    notes.forEach((note, index) => {
        if (noteItem.textContent.trim() === note.title) {
            notes.splice(index, 1)
        }
    })

    localStorage.setItem('notes', JSON.stringify(notes))
}
