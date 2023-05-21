// ♪音楽 → LITE SHOW MAGIC - CRACK TRAXXXX (EXXXXTEND MIXXXX) : https://www.youtube.com/watch?v=hjVJhsyNI8A

import html from './../utils/html.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'
import { works } from './../data/works.mjs'
import { scrambleOver, charsToHex } from './../utils/typist.mjs'
import { shuffleArray } from './../utils/misc.mjs'

const words = [
  'SINE',
  'HOPE',
  'GRIN',
  'WANE',
  'MOON',
  'TROT',
  'NIGH',
  'PELT',
  'SNOW',
  'SOFT',
  'TAIL',
  'HERD',
  'TALC',
  'BORN',
  'LOCK',
  'HORN',
  'AGES',
  'LONG',
  'WIND',
  'SALT',
]

const getFourRandomWords = () => shuffleArray(words).slice(0, 4).join(' ')

class SectionWorks extends Component {
  constructor() {
    super()

    this.name = 'sectionworks'
    this.lang = state.get('lang')
  }

  // <span aria-hidden="true" class="view-button"
  //   >view <span class="arrow">→</span>
  // </span>

  generateWorksList() {
    const worksList = Object.values(works).map(
      ({
        name,
        link,
        details,
        year,
        status,
        released = true,
        canonName,
        recentUpdate = false,
      }) => html`
        <li
          lang="${this.lang}"
          class="works-item intersection-item ${!released
            ? 'unreleased'
            : ''} ${recentUpdate ? 'recentupdate' : ''}"
          itemscope
          itemtype="https://schema.org/CreativeWork"
        >
          <a
            tabindex="0"
            href="${released ? link : '#'}"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div class="works-item-title">
              <span class="title" data-name=${canonName} itemprop="name"
                >${name[this.lang]}</span
              >
            </div>
            <aside class="works-item-subtitle">
              <span class="details" data-name=${canonName}
                >${details[this.lang]}</span
              >
            </aside>
            <div class="bar">
              <b></b
              ><span class="extra-info"
                ><span itemprop="dateCreated">${year}</span>
                <span class="works-item-subtitle-extra"
                  >&mdash; ${status}</span
                ></span
              ><b></b>
            </div>
          </a>
        </li>
      `
    )

    return worksList.join('')
  }

  connectedCallback() {
    const sectionId = 'works'

    this.innerHTML = html`
      <section class="intersection-item" id="${sectionId}">
        <header class="intersection-item">
          <span class="intersection-item">latest works</span>
        </header>

        <div class="works-container">
          <ul class="works-item-list">
            ${this.generateWorksList()}
          </ul>
        </div>

        <aside aria-hidden="true" class="works-underlay">
          <div></div>
        </aside>
      </section>
    `

    const hexBoxLines = document.querySelectorAll('.overlay-hexbox-text')

    const setUnderlayText = text => {
      const underlay = this.querySelector('.works-underlay div')

      underlay.textContent = text
    }

    const resetHexBox = () => {
      hexBoxLines[0].textContent = '0000 0000 0000 0000'
      hexBoxLines[1].textContent = '0000 0000 0000 0000'
      hexBoxLines[2].textContent = '0000 0000 0000 0000'
    }

    let resetHexBoxTimeout

    this.querySelectorAll('.works-item').forEach((title, i) => {
      const underlay = this.querySelector('.works-underlay')
      const hexbox = document.querySelector('.overlay-hexbox')

      title.addEventListener('mouseenter', ({ target }) => {
        clearTimeout(resetHexBoxTimeout)

        const linkText = target.querySelector('.title').textContent
        const linkTextLink = this.querySelectorAll('a')[i].href

        underlay.classList.add('active')
        hexbox.classList.add('active')

        scrambleOver(
          charsToHex([...linkTextLink].reverse().join('')),
          hexBoxLines[0],
          30
        )
          .then(() => scrambleOver(charsToHex(linkText), hexBoxLines[1], 30))
          .then(() => scrambleOver(getFourRandomWords(), hexBoxLines[2], 30))

        setUnderlayText(linkText)
      })

      title.addEventListener('mouseleave', () => {
        underlay.classList.remove('active')
        hexbox.classList.remove('active')

        resetHexBoxTimeout = setTimeout(resetHexBox, 810)

        setUnderlayText('')
      })
    })

    const worksMiscSections = this.querySelectorAll('.works-item-subtitle-misc')

    this.querySelectorAll('.dot').forEach(dot => {
      this.addMultiListener(dot, ['click', 'keydown'], ({ target }) => {
        const whichChild = target.classList[1].slice(-1)

        worksMiscSections[whichChild].classList.toggle('active')
      })
    })

    state.on('lang', lang => {
      this.lang = lang

      this.querySelectorAll('.works-item').forEach(element => {
        element.lang = this.lang
      })

      this.querySelectorAll('.title').forEach(element => {
        const canonName = element.dataset.name

        element.textContent = works[canonName].name[this.lang]
      })

      this.querySelectorAll('.details').forEach(element => {
        const canonName = element.dataset.name

        element.textContent = works[canonName].details[this.lang]
      })
    })
  }
}

export default { element: SectionWorks, name: 'section-works' }
