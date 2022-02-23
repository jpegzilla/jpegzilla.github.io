// ♪音楽 → EMPiRE - I HAVE A CHANCE!! : https://www.youtube.com/watch?v=hzYjZOjF0Us

import Component from './component.mjs'
import getpreloadertext from './../utils/getpreloaderwords.mjs'
import typist from './../utils/typist.mjs'
import {
  enableScroll,
  setupScrollingInteractions,
  html,
} from './../utils/index.mjs'
import { state } from './../main.mjs'

class LoadingScreen extends Component {
  constructor() {
    super()

    this.name = 'loadingscreen'
  }

  allDone() {
    state.do('loadingscreenremoved')

    setupScrollingInteractions()
    enableScroll()
    this.remove()
  }

  connectedCallback() {
    const messageBoxText = 'message-box-text'

    this.innerHTML = html`
      <section id="loadingscreen">
        <div class="welcome-box">
          ${this.toSpans('welcome')}
        </div>

        <div class="grid">
          <div class="message-box">
            <div class="${messageBoxText}"></div>
          </div>

          <b class="grid-border"></b>

          <div class="loading-bar">
            <div class="loading-bar-lines"></div>
            <div class="loading-bar-text">preparing...</div>
          </div>
        </div>
      </section>
    `

    const { text } = getpreloadertext()

    const msg = this.querySelector(`.${messageBoxText}`)

    // return this.allDone()

    typist(text, msg, 40, true, false).then(() => {
      setTimeout(() => {
        this.getById('loadingscreen').classList.add('done')
        // https://i.redd.it/spgk34y44q061.png
        // それは理由
        setTimeout(() => {
          this.getById('loadingscreen').classList.add('really-done')
          setTimeout(() => this.allDone(), 2000)
        }, 2500)
      }, 1000)
    })
  }
}

export default { element: LoadingScreen, name: 'loading-screen' }
