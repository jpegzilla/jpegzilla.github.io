// 音楽 → ORANGESTAR - 明日の夜空哨戒班 : https://youtu.be/XogSflwXgpw

import { state } from './../main.mjs'
import {
  hotkey,
  supportedLangs,
  translationToUse,
  html,
  keycodes,
} from './../utils/index.mjs'

const copy = {
  lightSwitchText: {
    light: {
      ja: '電気を消してください！',
      en: 'lights out, baby!',
    },
    dark: {
      ja: 'こわい…電気をつけてください…',
      en: "it's dark...turn the lights on...",
    },
  },
  langSwitchText: {
    en: "english or japanese, whichever you'd like",
    ja: '言語を切り替える',
  },
}

class SiteControls extends HTMLElement {
  constructor() {
    super()

    this.langs = supportedLangs
    this.activeLang = translationToUse
    this.mode = state.get('color')

    this.setActiveLang(translationToUse.code)
  }

  switchLanguageTo(lang) {
    this.setActiveLang(lang)
  }

  setActiveLang(lang) {
    this.activeLang = this.langs[lang]
    this.lang = lang
    document.documentElement.lang = lang

    state.set('lang', lang)
  }

  setColorScheme(color) {
    this.colorScheme = color

    if (color === 'light') {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    }

    state.set('color', color)
  }

  evaluateColorMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    if (prefersDark.matches) {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }

    this.colorScheme = prefersDark.matches ? 'dark' : 'light'

    prefersDark.addListener(e =>
      e.matches ? this.setColorScheme('dark') : this.setColorScheme('light')
    )
  }

  handleSwitch(e) {
    state.do('headermessage', '')

    const switchBody = e.target
    const switchArm = e.target.querySelector('b')
    switchArm.classList.add('stretch')

    if (state.get('audio')) state.play('key')

    setTimeout(() => {
      switchArm.classList.remove('stretch')
      switchBody.classList.contains('off')
        ? switchBody.classList.remove('off')
        : switchBody.classList.add('off')
    }, 200)
  }

  connectedCallback() {
    this.evaluateColorMode()

    const lightSwitchClass = this.colorScheme === 'dark' ? 'off' : 'on'
    const langSwitchClass = this.lang === 'ja' ? 'off' : 'on'

    const circleBounds = 34
    const circleSize = 16

    this.innerHTML = html`
      <div lang="${this.lang}" id="site-controls">
        <address class="email-container">
          <a
            href="mailto:eris@jpegzilla.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="eris@jpegzilla.com"
            >→→ eris@jpegzilla.com</a
          >
        </address>

        <div
          accesskey="k"
          class="controls light-controls"
          id="light-controls"
          title="hotkey: k"
        >
          <svg
            class="light-controls-icon-on"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 ${circleBounds} ${circleBounds}"
          >
            <g>
              <g>
                <circle
                  cx="${circleBounds / 2}"
                  cy="${circleBounds / 2}"
                  r="${circleSize}"
                />
              </g>
            </g>
          </svg>
          <div class="light-controls-on">on</div>
          <div class="controls-outer">
            <div
              tabindex="0"
              class="light-controls-switch ${lightSwitchClass}"
              aria-label="toggle the page's color scheme."
              role="button"
            >
              <b></b>
            </div>
          </div>
          <div class="light-controls-off">off</div>
          <svg
            class="light-controls-icon-off"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 ${circleBounds} ${circleBounds}"
          >
            <g>
              <g>
                <circle
                  cx="${circleBounds / 2}"
                  cy="${circleBounds / 2}"
                  r="${circleSize}"
                />
              </g>
            </g>
          </svg>
        </div>
        <div
          accesskey="l"
          class="controls lang-controls"
          id="lang-controls"
          title="hotkey: l"
        >
          <div class="lang-controls-en" lang="en">en</div>
          <div class="controls-outer">
            <div
              class="lang-controls-switch ${langSwitchClass}"
              tabindex="0"
              aria-label="toggle the page's language."
              role="button"
            >
              <b></b>
            </div>
          </div>
          <div class="lang-controls-ja" lang="ja">日本</div>
        </div>
      </div>
    `

    const toggleActiveLang = e => {
      if (e.repeat) return

      if (e.type === 'keydown' && ![' ', 'Enter'].includes(e.key)) return

      if (this.activeLang.code === 'en') this.setActiveLang('ja')
      else if (this.activeLang.code === 'ja') this.setActiveLang('en')
    }

    const toggleLights = e => {
      if (e.repeat) return

      if (e.type === 'keydown' && ![' ', 'Enter'].includes(e.key)) return

      if (this.colorScheme === 'dark') this.setColorScheme('light')
      else if (this.colorScheme === 'light') this.setColorScheme('dark')
    }

    hotkey('k', () => {
      const lightControls = this.querySelector('.light-controls-switch')

      this.handleSwitch({ target: lightControls })

      toggleLights({
        type: 'keydown',
        key: 'Enter',
      })
    })

    hotkey('l', () => {
      const langControls = this.querySelector('.lang-controls-switch')

      this.handleSwitch({ target: langControls })

      toggleActiveLang({
        type: 'keydown',
        key: 'Enter',
      })
    })

    this.querySelectorAll('.controls').forEach(sw => {
      sw.addEventListener('click', this.handleSwitch)
      sw.addEventListener('keydown', e => {
        if (e.repeat) return

        if (e.type === 'keydown' && ![keycodes.enter].includes(e.key)) return

        this.handleSwitch(e)
      })

      sw.addEventListener('mouseenter', e => {
        let message = ''

        const { lightSwitchText, langSwitchText } = copy

        switch (e.target.id) {
          case 'light-controls':
            message =
              this.colorScheme === 'dark'
                ? lightSwitchText.dark[this.lang]
                : lightSwitchText.light[this.lang]
            break
          case 'lang-controls':
            message = this.lang === 'ja' ? langSwitchText.ja : langSwitchText.en
            break
        }

        state.do('headermessage', message)
      })

      sw.addEventListener('mouseleave', () => {
        state.do('headermessage', '')
      })
    })

    const langControls = this.querySelector('.lang-controls')
    const lightControls = this.querySelector('.light-controls')

    langControls.addEventListener('click', toggleActiveLang)
    langControls.addEventListener('keydown', toggleActiveLang)

    lightControls.addEventListener('click', toggleLights)
    lightControls.addEventListener('keydown', toggleLights)
  }
}

export default { element: SiteControls, name: 'site-controls' }
