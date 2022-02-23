// ♪音楽 → 花たん - ETERNAL PARTY : https://www.youtube.com/watch?v=ygNhqwq9WVA

import { html, cheatcode, keycodes, printDate } from './../utils/index.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'

const copy = {
  linkMessageText: {
    discord: {
      en: "wanna talk to me and my friends? we're over here!",
      ja: '参加したいかな…',
    },
    twitter: {
      en: 'come...hear my rambling? idk.',
      ja: '意味ない雑談',
    },
    github: {
      en: 'check out my code and writing!',
      ja: '文章とコードを読む',
    },
  },
}

class SiteOverlay extends Component {
  constructor() {
    super()

    this.name = 'siteoverlay'
    this.lang = state.get('lang')
  }

  connectedCallback() {
    state.on('lang', lang => {
      this.lang = lang
    })

    this.innerHTML = html`
      <div id="site-overlay">
        <div class="overlay-scrollindicator" aria-hidden="true">
          <div class="overlay-scrollindicator-container">
            <div class="overlay-scrollindicator-inner"></div>
          </div>
        </div>

        <div class="overlay-hexbox" aria-hidden="true">
          <p class="overlay-hexbox-text">0000 0000 0000 0000</p>
          <p class="overlay-hexbox-text">0000 0000 0000 0000</p>
          <p class="overlay-hexbox-text">0000 0000 0000 0000</p>
        </div>

        <div class="overlay-bottom">
          <div class="overlay-bottom-stats">
            <ul>
              <li class="hidden" id="discord">
                <a
                  tabindex="0"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://discordapp.com/invite/Ft9rVA6"
                  >${this.toSpans('discord')}</a
                >
              </li>
              <li class="hidden" id="twitter">
                <a
                  tabindex="0"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/jpegzilla"
                  >${this.toSpans('twitter')}</a
                >
              </li>
              <li class="hidden" id="github">
                <a
                  tabindex="0"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jpegzilla"
                  >${this.toSpans('github')}</a
                >
              </li>
            </ul>
          </div>

          <div class="overlay-bottom-button-container">
            <div tabindex="0" class="overlay-bottom-button"><b></b><b></b></div>
          </div>
        </div>

        <div class="cheatcode-display"></div>
      </div>

      <div class="overlay-linedecoration" aria-hidden="true">
        <div class="overlay-linedecoration-inner"></div>
      </div>
    `

    document.addEventListener('scroll', () => {
      const scrollind = this.querySelector('.overlay-scrollindicator-inner')
      const delta = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      let progress = (delta / height) * 100

      scrollind.style.height = `${progress}%`
    })

    const infoButtonOuter = this.querySelector(
      '.overlay-bottom-button-container'
    )
    const infoButton = this.querySelector('.overlay-bottom-button')
    const bottomStats = this.querySelector('.overlay-bottom-stats')

    this.addMultiListener(infoButtonOuter, ['click', 'keydown'], e => {
      if (e.type === 'keydown' && ![keycodes.enter].includes(e.key)) return

      state.play('key')

      infoButton.classList.toggle('active')
      bottomStats.classList.toggle('active')

      const listItems = bottomStats.querySelectorAll('li')

      listItems.forEach(el => {
        if (bottomStats.classList.contains('active'))
          el.classList.remove('hidden')
        else {
          setTimeout(() => el.classList.add('hidden'), 750)
        }
      })
    })

    const discordLink = this.querySelector('#discord')
    const twitterLink = this.querySelector('#twitter')
    const githubLink = this.querySelector('#github')

    const links = [discordLink, twitterLink, githubLink]

    links.forEach(el => {
      el.addEventListener('mouseenter', e => {
        let message = ''

        const { linkMessageText } = copy

        switch (e.target.id) {
          case 'discord':
            message = linkMessageText.discord[this.lang]
            break
          case 'github':
            message = linkMessageText.github[this.lang]
            break
          case 'twitter':
            message = linkMessageText.twitter[this.lang]
            break
        }

        state.do('headermessage', message)
      })

      el.addEventListener('mouseleave', () => {
        state.do('headermessage', '')
      })
    })

    const cheatcodeList = [
      {
        code: 'left, right, up, down',
        callback: () => {
          console.log('hello!')
        },
      },
    ]

    cheatcodeList.forEach(({ code, callback }) => {
      new cheatcode(code, callback, 1000, progress => {
        this.querySelector('.cheatcode-display').textContent = progress.join(
          ' '
        )
      }).start()
    })
  }
}

export default { element: SiteOverlay, name: 'site-overlay' }
