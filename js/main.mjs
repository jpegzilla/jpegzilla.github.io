// ♪音楽 → VIRTUAL SELF - PARTICLE ARTS : https://www.youtube.com/watch?v=b06pKMxF6h8

// コンポネント
import {
  LoadingScreen,
  SiteControls,
  SiteOverlay,
  SiteHeader,
  SectionHeaven,
  SectionWorks,
  SectionHell,
  SectionAbout,
  SectionFooter,
  SiteUnderlay,
} from './components/index.mjs'

// その他
import {
  translationToUse,
  disableScroll,
  colorToUse,
  isMobile,
  State,
  setupIntersector,
  setupScrolling,
} from './utils/index.mjs'

import './utils/scroll.min.mjs'

disableScroll()

const elements = [
  LoadingScreen,
  SiteControls,
  SectionHeaven,
  SiteHeader,
  SiteOverlay,
  SiteUnderlay,
  SectionWorks,
  SectionHell,
  SectionAbout,
  SectionFooter,
]

export const state = new State('jpegzilla-vi')

state.load()

if (isMobile()) {
  state.set('audio', false)
}

// コンマ演算子 やほおぉぉぉぉぉぉぉぉ
state.get('lang') || (state.set('lang', translationToUse), translationToUse)
state.get('color') || (state.set('color', colorToUse), colorToUse)

document.body.lang = state.get('lang').code

elements.forEach(({ name, element }) => {
  customElements.define(name, element)
})

// イベント
// state.on('color', val => {
//   console.log(`color changed to ${val}`)
// })

state.on('lang', val => {
  // console.log(`language changed to ${val}`)

  document.body.lang = val
  document.lang = val
})

const originalTitle = document.title

window.onblur = () => {
  document.title = 'hey, come back...'
}

window.onfocus = () => {
  document.title = originalTitle
}

// setupIntersector(), setupScrolling() // remove this!!

state.on('loadingscreenremoved', () => {
  setupIntersector(), setupScrolling()
}) // uncomment this!!

// console.log('trans rights')

console.log('%c snooping as usual, I see!', 'font-style: italic')

console.log(
  `%c

  ████████ ██████   █████  ███    ██ ███████     ██████  ██  ██████  ██   ██ ████████ ███████
     ██    ██   ██ ██   ██ ████   ██ ██          ██   ██ ██ ██       ██   ██    ██    ██
     ██    ██████  ███████ ██ ██  ██ ███████     ██████  ██ ██   ███ ███████    ██    ███████
     ██    ██   ██ ██   ██ ██  ██ ██      ██     ██   ██ ██ ██    ██ ██   ██    ██         ██
     ██    ██   ██ ██   ██ ██   ████ ███████     ██   ██ ██  ██████  ██   ██    ██    ███████

  `,
  'font-family: monospace'
)
