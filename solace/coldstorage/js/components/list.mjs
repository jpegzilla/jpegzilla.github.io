import Component from './component.mjs'
import { html, trunc, uuidv4 } from './../utils/string.mjs'
import { state } from './../main.mjs'

let noteToDelete

class List extends Component {
  static name = 'coldstorage-list'
  constructor() {
    super()

    this.id = List.name
  }

  renderListItems(list) {
    if (!list) return ''

    return html`<ul>
      ${Object.values(list)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(({ title, id }) => {
          const activeClass = id === state.get('activenote') ? ' active' : ''
          return html`<li>
            <button class="list-note-entry${activeClass}" data-id="${id}">
              ${trunc(title, 42)}
            </button>
            <button class="list-note-delete" data-id="${id}">x</button>
          </li>`
        })
        .join('')}
    </ul>`
  }

  connectedCallback() {
    const listItems = state.get('notes')

    this.innerHTML = html`
      <dialog id="new-note-dialog">
        <form method="dialog">
          <label>
            <span>enter note title:</span>
            <input type="text" class="new-note-title" placeholder="title..." />
          </label>

          <div>
            <button class="confirm-new-note">confirm</button>
            <button class="cancel-new-note">cancel</button>
          </div>
        </form>
      </dialog>

      <dialog id="delete-note-dialog">
        <form method="dialog">
          <label>
            <span>delete note?</span>
          </label>

          <div>
            <button type="reset" class="confirm-delete-note">confirm</button>
            <button type="reset" class="cancel-delete-note">cancel</button>
          </div>
        </form>
      </dialog>

      <button class="list-new-note">new note +</button>
      <div class="list-items">${this.renderListItems(listItems)}</div>
    `
    const listItemContainer = this.qs('.list-items')

    const renderList = e => {
      listItemContainer.innerHTML = this.renderListItems(e)

      attachListeners()
    }

    const deleteNoteDialog = this.qs('#delete-note-dialog')
    const cancelDeleteNote = this.qs('.cancel-delete-note')
    const confirmDeleteNote = this.qs('.confirm-delete-note')

    const deleteNote = noteToDelete => {
      const currentNotes = state.get('notes')
      const activeNote = state.get('activenote')
      let newActiveNote = activeNote

      const ids = Object.keys(currentNotes)

      const notesToKeep = Object.entries(currentNotes).filter(([_k, v]) => {
        return v.id !== noteToDelete
      })

      if (activeNote === noteToDelete)
        newActiveNote =
          ids.findIndex(e => e === activeNote) - 1 === -1
            ? null
            : ids[ids.findIndex(e => e === activeNote) - 1]

      state.set('notes', Object.fromEntries(notesToKeep))
      state.set('activenote', newActiveNote)

      renderList(state.get('notes'))
    }

    const attachListeners = () => {
      const [...listEntry] = this.qsa('.list-note-entry')
      const [...listEntryDelete] = this.qsa('.list-note-delete')

      for (const entry of listEntry) {
        entry.addEventListener('click', e => {
          const newActiveNote = e.target.dataset.id

          listEntry.forEach(e => e.classList.remove('active'))
          e.target.classList.add('active')

          state.set('activenote', newActiveNote)
        })
      }

      for (const entry of listEntryDelete) {
        entry.addEventListener('click', e => {
          noteToDelete = e.target.dataset.id

          e.preventDefault()
          deleteNoteDialog.showModal()
        })
      }
    }

    cancelDeleteNote.addEventListener('click', e => {
      e.preventDefault()
      deleteNoteDialog.close('false')
    })

    confirmDeleteNote.addEventListener('click', e => {
      e.preventDefault()
      deleteNoteDialog.close('true')
    })

    deleteNoteDialog.addEventListener('close', e => {
      if (e.target.returnValue === 'true') {
        deleteNote(noteToDelete)
      }

      e.target.returnValue = ''
      deleteNoteDialog.querySelector('form').reset()
    })

    const addNoteButton = this.qs('.list-new-note')
    const newNoteDialog = this.qs('#new-note-dialog')
    const newNoteTitleInput = this.qs('.new-note-title')
    const cancelNewNote = this.qs('.cancel-new-note')
    const confirmNewNote = this.qs('.confirm-new-note')

    addNoteButton.addEventListener('click', e => {
      e.preventDefault()
      newNoteDialog.showModal()
    })

    cancelNewNote.addEventListener('click', e => {
      e.preventDefault()
      newNoteDialog.close()
    })

    confirmNewNote.addEventListener('click', e => {
      const value = newNoteTitleInput.value

      if (!value) {
        e.preventDefault()
        return
      }

      newNoteDialog.close(value)
    })

    newNoteDialog.addEventListener('close', e => {
      e.preventDefault()
      const newNoteTitle = newNoteDialog.returnValue

      if (newNoteTitle) {
        const allNotes = state.get('notes')
        const newNoteId = uuidv4()

        const newNoteData = {
          title: newNoteTitle,
          content: '',
          timestamp: new Date().getTime(),
          id: newNoteId,
        }

        allNotes[newNoteId] = newNoteData

        state.set('activenote', newNoteId)
        state.set('notes', allNotes)
      }

      e.target.returnValue = ''
      newNoteTitleInput.value = ''
      newNoteDialog.querySelector('form').reset()
    })

    attachListeners()

    state.on('notes', e => {
      renderList(e)
    })

    state.on('activenote', () => {
      renderList(state.get('notes'))
    })
  }
}

export default { element: List, name: List.name }
