// New note form
const addNotesForm = document.querySelector('#addNotes')
const newNoteTitle = document.querySelector('#addNotes .input.note-title')
const newNoteBody = document.querySelector('#addNotes .input.note-body')

// Edit note form
const editNoteForm = document.querySelector('#editNotes')
const editNoteIndex = document.querySelector('#editNotes .note-index')
const editNoteTitle = document.querySelector('#editNotes .input.note-title')
const editNoteBody = document.querySelector('#editNotes .input.note-body')

// Notes tab
const notesTab = document.querySelector('.notes')

addNotesForm.onsubmit = addNote
editNoteForm.onsubmit = updateNote
notesTab.onclick = e => {
  if (e.target.parentElement.classList.contains('edit')) {
    editNote(e.target.parentElement.parentElement.parentElement)
  }

  if (e.target.parentElement.classList.contains('delete')) {
    removeNote(e.target.parentElement.parentElement.parentElement)
  }
}

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
    notesTab.innerHTML = `
            <div class="emptyContent">
                <i class="fas fa-sticky-note"></i>
                <p>You have no notes yet</p>
            </div>
        `
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
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
  }, 3000)
})

function addNote(e) {
  e.preventDefault()

  if (newNoteTitle.value === '' || newNoteBody.value === '') {
    alert('Add a note')
  } else {
    const noteContainer = `
            <div class="note">
                <div class="title">
                    <h3>${newNoteTitle.value}</h3>
                    <div class="task-controls">
                        <button class="edit" title="Edit note"><i class="fas fa-edit"></i></button>
                        <button class="delete" title="Delete note"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div class="text">
                    <p>${newNoteBody.value}</p>
                </div>
            </div>
        `

    notesTab.innerHTML += noteContainer
    storeNoteInLocalStorage({
      title: newNoteTitle.value,
      body: newNoteBody.value,
    })
    addNotesForm.classList.toggle('active')
    document.querySelector('.content').classList.toggle('overlay')
    newNoteTitle.value = ''
    newNoteBody.value = ''
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

function editNote(note) {
  let notes
  if (localStorage.getItem('notes') === null) {
    notes = []
  } else {
    notes = JSON.parse(localStorage.getItem('notes'))
  }

  editNoteForm.classList.toggle('active')
  document.querySelector('.content').classList.toggle('overlay')
  editNoteIndex.value = notes.findIndex(x => x.title === note.innerText.trim())
  editNoteTitle.value = note.innerText.trim()
  editNoteBody.value = note.nextElementSibling.innerText.trim()
}

function updateNote(e) {
  e.preventDefault()

  let notes
  if (localStorage.getItem('notes') === null) {
    notes = []
  } else {
    notes = JSON.parse(localStorage.getItem('notes'))
  }

  if (editNoteTitle.value === '' || editNoteBody.value === '') {
    alert('Add a note')
  } else {
    const oldNote = document.querySelectorAll('div.note')[editNoteIndex.value]
    const newNote = document.createElement('div')
    newNote.className = 'note'
    newNote.innerHTML = `
            <div class="title">
                <h3>${editNoteTitle.value}</h3>
                <div class="task-controls">
                    <button class="edit" title="Edit note"><i class="fas fa-edit"></i></button>
                    <button class="delete" title="Delete note"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="text">
                <p>${editNoteBody.value}</p>
            </div>
        `
    notesTab.replaceChild(newNote, oldNote)

    notes[editNoteIndex.value].title = editNoteTitle.value
    notes[editNoteIndex.value].body = editNoteBody.value
    localStorage.setItem('notes', JSON.stringify(notes))

    editNoteForm.classList.remove('active')
    document.querySelector('.content').classList.remove('overlay')
    editNoteTitle.value = ''
    editNoteBody.value = ''
  }
}

function removeNote(note) {
  if (confirm('Are You Sure?')) {
    note.parentElement.remove()
    removeNoteFromLocalStorage(note)
    inspectNotes()
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

setTimeout(() => {
  if (notes.length === 0) {
    let defaultNote = {
      title: 'GADS 2020',
      body: `This is a project that Emmanuel created as part of the Googel Africa Developer
        Scholarship(GADS) program. All the projects displayed here were created as part of
        GADS tasks/challenges from the awesome GADS mentors.`,
    }

    storeNoteInLocalStorage(defaultNote)
  }
}, 3000)
