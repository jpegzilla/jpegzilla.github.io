import { State } from './utils/index.mjs'
import { elements } from './components/index.mjs'

export const state = new State('cold::storage')

if (state.get('notes')) {
  const currentNotes = state.get('notes')

  if (currentNotes.length) {
    const nonEmpty = Object.entries(currentNotes).filter(([_k, v]) => {
      return v.content.length > 20 && v.content.length <= 300
    })

    const newActiveNote = nonEmpty?.[0][0]

    if (newActiveNote) {
      if (!(nonEmpty.length === Object.entries(currentNotes).length)) {
        state.set('notes', Object.fromEntries(nonEmpty))
        state.set('activenote', newActiveNote)
      }
    }
  }
}

// initialize notes
if (!state.get('notes')) {
  state.set('notes', {})
}

elements.forEach(({ name, element }) => {
  if (name && element) customElements.define(name, element)
})
