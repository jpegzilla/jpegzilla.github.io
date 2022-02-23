// ♪音楽 → SOTA FUJIMORI - FLY ABOVE -ALBUM EXTENDED- : https://www.youtube.com/watch?v=RTwjGeCEHUs

import html from './../utils/html.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'
import typist from './../utils/typist.mjs'
import getpreloadertext from './../utils/getpreloaderwords.mjs'

const copy = {
  linkMessageText: {
    works: {
      en: 'some of the stuff I made!',
      ja: 'さまざま作ったこと',
    },
    about: {
      en: 'who is this person, anyway...',
      ja: 'このやつはだれか…',
    },
    contact: {
      en: "I promise I won't ignore you",
      ja: 'あなたは見逃されません!',
    },
  },
}

class SiteHeader extends Component {
  constructor() {
    super()

    this.name = 'siteheader'
    this.lang = state.get('lang')
  }

  connectedCallback() {
    // state.on('loadingscreenremoved', () => {
    //   this.querySelectorAll('.links ul li').forEach(el => {
    //     el.classList.add('active')
    //   })
    //
    //   const name = 'jpegzilla'
    //   const wordmark = this.querySelector('.wordmark')
    //
    //   typist([[name]], wordmark)
    //
    //   wordmark.innerHTML = `${[...name].map(c => `<span>${c}</span>`).join('')}<span></span>`
    //
    //   const span = wordmark.querySelector('span')
    //
    //   typist([[':vi']], span)
    // })
    state.on('lang', lang => {
      this.lang = lang
    })

    const {
      adjectives,
      nouns,
      // divider,
    } = getpreloadertext()

    let codename = ` ${adjectives[0]} ${nouns[0]}`

    if (/\s/.test(nouns[0])) {
      codename = ` ${nouns[0]}`
    }

    state.set('codename', codename.trim())

    this.innerHTML = html`
      <header id="site-header">
        <div translate="no" class="wordmark">
          <span>jpegzilla</span><span>[rev. 2022]<span>${codename}</span></span>
        </div>
        <b class="spacer"></b>
        <div class="status-message"></div>
        <b class="spacer"></b>
        <div class="links">
          <ul>
            <li id="works-link" class="active">
              <a
                data-scroll="anchor"
                class="links-text"
                href="#works"
                tabindex="0"
              >
                ${this.toSpans('works')}
              </a>
            </li>
            <li id="about-link" class="active">
              <a
                data-scroll="anchor"
                class="links-text"
                href="#about"
                tabindex="0"
              >
                ${this.toSpans('about')}
              </a>
            </li>
            <li id="contact-link" class="active">
              <a
                data-scroll="anchor"
                class="links-text"
                href="#contact"
                tabindex="0"
              >
                ${this.toSpans('contact')}
              </a>
            </li>
          </ul>
        </div>
      </header>
    `

    const worksLink = this.querySelector('#works-link')
    const aboutLink = this.querySelector('#about-link')
    const contactLink = this.querySelector('#contact-link')

    const links = [worksLink, aboutLink, contactLink]

    const { linkMessageText } = copy

    links.forEach(el => {
      el.addEventListener('mouseenter', e => {
        let message = ''

        switch (e.target.id) {
          case 'works-link':
            message = linkMessageText.works[this.lang]
            break
          case 'about-link':
            message = linkMessageText.about[this.lang]
            break
          case 'contact-link':
            message = linkMessageText.contact[this.lang]
            break
        }

        state.do('headermessage', message)
      })

      el.addEventListener('mouseleave', () => {
        state.do('headermessage', '')
      })
    })

    const statusMessage = this.querySelector('.status-message')

    state.on('headermessage', message => {
      if (state.temp.typist) {
        clearInterval(state.temp.typist)
        delete state.temp.typist
      }

      if (message.length)
        typist([[message]], statusMessage, 30, true, true, state)
      else statusMessage.textContent = ''
    })
  }
}

export default { element: SiteHeader, name: 'site-header' }
