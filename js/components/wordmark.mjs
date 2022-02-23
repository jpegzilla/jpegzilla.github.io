// ♪音楽 → KITCALIBER - HALCYONDAZE : https://youtu.be/b_3VdvTibCI

import html from './../utils/html.mjs'
import Component from './component.mjs'

class Wordmark extends Component {
  connectedCallback() {
    this.innerHTML = html`
      <div id="wordmark">
        <span>xxxx</span>
        <span>xxxxx</span>
      </div>
    `
  }
}

export default { element: Wordmark, name: 'word-mark' }
