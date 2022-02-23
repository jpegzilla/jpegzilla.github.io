// ♪音楽 → SEWERSLVT - DRAINING LOVE STORY : https://www.youtube.com/watch?v=DBejlYvfBF8

import Component from './component.mjs'
import { state } from './../main.mjs'
import { html, weightedRandom } from './../utils/index.mjs'

const icons = [
  {
    icon: 'red_heart',
    alt: 'a red heart.',
  },
  {
    icon: 'furry_pride',
    alt: "a rainbow-colored animal's paw.",
  },
  {
    icon: 'maple_leaf',
    alt: 'a maple leaf.',
  },
  {
    icon: 'bisexual_flag',
    alt: 'a bi flag.',
  },
  {
    icon: 'pirate_flag',
    alt: 'a pirate flag.',
  },
  {
    icon: 'transgender_flag',
    alt: 'a trans flag.',
  },
  {
    icon: 'gamepad',
    alt: 'a gamepad.',
  },
]

const renderIcons = () => {
  const getTitle = title => (title ? `title="${title}"` : '')

  return icons
    .map(({ icon, alt, title = '' }) => {
      return html`<img
        src="./css/img/mtns-icons/${icon}.svg"
        alt="${alt}"
        ${getTitle(title)}
      />`
    })
    .join('')
}

class SectionFooter extends Component {
  constructor() {
    super()

    this.name = 'sectionfooter'
    this.lang = state.get('lang')
    this.id = `${this.name}-container`
  }

  connectedCallback() {
    const sectionId = 'footer'

    this.innerHTML = html`
      <footer id="${sectionId}">
        <div>
          <span>
            &copy; 2020 - ${new Date().getFullYear()} jpegzilla &#9913;
            <a href="./credits.html" target="_blank" rel="noreferrer noopener"
              >site credits</a
            >
            &#9913;
            <a href="./humans.txt" target="_blank" rel="noreferrer noopener"
              >humans.txt</a
            >
            &#9913;
            <a href="./humans.txt" target="_blank" rel="noreferrer noopener"
              >source code</a
            >
            &#9913; may your flowers bloom eternally under the sky.
          </span>
          <span class="emojis">
            ${renderIcons()}
          </span>
        </div>
      </footer>
    `
  }
}

export default { element: SectionFooter, name: 'section-footer' }
