import Component from './component.mjs'
import { html, allRabinKarp } from '../utils/index.mjs'
import { state } from './../main.mjs'

class Header extends Component {
  static name = 'coldstorage-header'
  constructor() {
    super()

    this.id = Header.name
  }

  searchResultList(found) {
    return html`<ul>
      ${found
        .sort((a, b) => b.indices.length - a.indices.length)
        .map(({ id, indices, pattern }) => {
          const currentNote = state.get('notes')[id]
          const hits = indices.length
          const indicesPluralized = hits === 0 || hits > 1 ? 'hits' : 'hit'
          return html`<li tabindex="0" data-id="${id}" class="search-result">
            [${new Date(currentNote.timestamp).toLocaleString()}]
            ${currentNote.title} &mdash; ${indices.length} ${indicesPluralized}
            for "${pattern}"
          </li>`
        })
        .join('')}
    </ul>`
  }

  connectedCallback() {
    this.innerHTML = html`
      <input
        type="text"
        spellcheck="false"
        class="note-search"
        placeholder="search all notes..."
      />
      <div class="search-results"></div>
      <b class="spreader"></b>
      <div class="wordmark">
        <span class="title">cold::<span class="hl">storage</span></span>
      </div>
    `

    const searchAllNotes = pattern => {
      if (!pattern) return

      const allNotes = state.get('notes')

      const entries = Object.entries(allNotes)

      const found = []

      for (const [id, data] of entries) {
        const { indices, matchCount } = allRabinKarp(data.content, pattern)

        if (matchCount) {
          found.push({
            id,
            indices,
            pattern,
          })
        }
      }

      return found
    }

    const searchResults = this.qs('.search-results')
    const searchInput = this.qs('.note-search')

    document.addEventListener('click', e => {
      if (e.target !== searchResults && e.target !== searchInput) {
        searchResults.innerHTML = ''
        searchResults.classList.remove('active')
      }
    })

    document.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'escape') {
        searchInput.value = ''
        searchResults.innerHTML = ''
        searchResults.classList.remove('active')
      }
    })

    searchInput.addEventListener('input', e => {
      const found = searchAllNotes(e.target.value)

      if (found?.length) {
        searchResults.classList.add('active')
        searchResults.innerHTML = this.searchResultList(found)

        const [...searchResultsListItems] = this.qsa('.search-result')

        const handleSearchResult = e => {
          const newActiveNote = e.target.dataset.id

          state.set('activenote', newActiveNote)

          searchInput.value = ''
          searchResults.innerHTML = ''
          searchResults.classList.remove('active')
        }

        searchResultsListItems.forEach(e => {
          e.addEventListener('click', handleSearchResult)
          e.addEventListener('keydown', e => {
            const key = e.key.toLowerCase()

            if (key === 'enter' || key === 'space') {
              handleSearchResult(e)
            }
          })
        })
      } else {
        searchResults.innerHTML = ''
        searchResults.classList.remove('active')
      }
    })
  }
}

export default { element: Header, name: Header.name }
