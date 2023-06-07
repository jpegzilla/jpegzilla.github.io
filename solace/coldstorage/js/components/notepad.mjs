import Component from './component.mjs'
import { html, setTitle, defaultDocumentTitle } from './../utils/index.mjs'
import { state } from './../main.mjs'

class Notepad extends Component {
  static name = 'coldstorage-notepad'
  constructor() {
    super()

    this.id = Notepad.name
  }

  renderStats({ age, unique, char, word }) {
    let warningText

    if (char < 20) warningText = '[too short. will not be saved!]'
    if (char >= 300) warningText = '[max length]'

    return html`CREATED::${age} WORDS::${word}
    CHARACTERS::${char < 20 || char >= 300
      ? html`<span class="warning">${char}/300</span> ${warningText}`
      : html`<span>${char}/300</span>`}
    UNIQUE::${unique}`
  }

  renderHeader({ title, age, unique, char, word }) {
    return html`<header>
      <div class="note-title" contenteditable spellcheck="false">
        ${title.toString()}
      </div>
      <span class="note-stats"
        >${this.renderStats({ age, unique, char, word })}</span
      >
    </header>`
  }

  renderNote({ content }) {
    return html`<textarea
      maxlength="300"
      minlength="20"
      spellcheck="false"
      class="note-content"
    >
${content}</textarea
    >`
  }

  connectedCallback() {
    const defaultHTML = html`<header class="header"></header>
      <div class="content">
        <div class="prompt">
          no note loaded. select a note from the sidebar, or click "new note +".
        </div>
      </div>`

    this.innerHTML = defaultHTML

    const getContentSlot = () => this.qs('.content')
    const getHeaderSlot = () => this.qs('.header')
    const getNoteContent = () => this.qs('.note-content')
    const getNoteTitle = () => this.qs('.note-title')

    const renderActiveNote = id => {
      const activeNote = state.get('notes')[id]

      if (activeNote) {
        const { timestamp, title, content } = activeNote
        const age = new Date(timestamp).toLocaleString()
        const unique =
          content.length === 0 ? 0 : [...new Set(content.split(' '))].length
        const char = content.length
        const word = content.length === 0 ? 0 : content.split(' ').length

        getHeaderSlot().innerHTML = this.renderHeader({
          title,
          age,
          unique,
          char,
          word,
        })

        getContentSlot().innerHTML = this.renderNote({
          content,
        })

        getContentSlot().querySelector('textarea').focus()

        getNoteTitle().addEventListener('input', e => {
          const title = e.target.textContent

          const noteId = state.get('activenote')

          const newCurrentNote = {
            ...state.get('notes')[noteId],
            title,
          }

          const newNoteState = {
            ...state.get('notes'),
            [noteId]: newCurrentNote,
          }

          state.set('notes', newNoteState)
        })

        getNoteContent().addEventListener('input', e => {
          const content = e.target.value
          const newUnique =
            content.length === 0 ? 0 : [...new Set(content.split(' '))].length
          const newChar = content.length
          const newWord = content.length === 0 ? 0 : content.split(' ').length

          this.qs('.note-stats').innerHTML = this.renderStats({
            age,
            unique: newUnique,
            char: newChar,
            word: newWord,
          })

          if (newChar < 20 || newChar > 300) return

          const noteId = state.get('activenote')

          const newCurrentNote = {
            ...state.get('notes')[noteId],
            content,
          }

          const newNoteState = {
            ...state.get('notes'),
            [noteId]: newCurrentNote,
          }

          state.set('notes', newNoteState)
        })
      }
    }

    window.addEventListener('keydown', e => {
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault()
      }
    })

    state.on('activenote', id => {
      renderActiveNote(id)

      if (state.get('notes')[id]) {
        setTitle(`cold::storage - ${state.get('notes')[id].title}`)
      } else {
        this.innerHTML = defaultHTML
        setTitle(defaultDocumentTitle)
      }
    })

    renderActiveNote(state.get('activenote'))
  }
}

export default { element: Notepad, name: Notepad.name }
