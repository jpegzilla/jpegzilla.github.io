import html from './../utils/html.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'

const contactMethods = [
  {
    name: {
      en: 'email',
      ja: 'メール',
    },
    details: {
      en: "send me an email! I'll typically respond within 24 hours.",
      ja: '営業のためにメッセージを送信してください。',
    },
    link: 'mailto:eris@jpegzilla.com?subject=hello!',
    status: 'open &mdash; business only',
  },
  {
    name: {
      en: 'twitter',
      ja: 'ツイッター',
    },
    details: {
      en: 'you can also contact me through twitter messages!',
      ja: 'ツイッターでコンタクトを取ることができます！',
    },
    link: 'https://twitter.com/jpegzilla',
    status: 'open &mdash; casual',
  },
  {
    name: {
      en: 'discord',
      ja: 'discord',
    },
    details: {
      en: 'this is my discord server.',
      ja: 'ディスコードサーバーです。',
    },
    link: 'https://discordapp.com/invite/Ft9rVA6',
    status: 'open &mdash; casual',
  },
]

class SectionHell extends Component {
  constructor() {
    super()

    this.name = 'sectionhell'
    this.lang = state.get('lang')
  }

  generateContactMethodList() {
    const contactList = Object.values(contactMethods).map(
      ({ name, link, details, status }) => html`
        <li class="contact-item intersection-item">
          <a
            tabindex="0"
            href="${link}"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div class="contact-item-title">
              <span
                class="title${name.ja === name.en ? ' revert' : ''}"
                data-name=${name.en}
                >${name[this.lang]}</span
              >
            </div>
            <aside
              class="contact-item-subtitle"
              aria-label="additional information"
            >
              <span data-name=${name.en} class="details"
                >${details[this.lang]}</span
              >
            </aside>
            <div class="bar">
              <b></b>
              <span class="contact-item-subtitle-extra">${status}</span><b></b>
            </div>
          </a>
        </li>
      `
    )

    return contactList.join('')
  }

  connectedCallback() {
    const sectionId = 'contact'
    const sectionTitle = "let's talk!"

    const render = () => {
      this.innerHTML = html`
        <section class="intersection-item" id="${sectionId}">
          <header class="intersection-item">
            <span class="intersection-item">${sectionTitle}</span>
          </header>

          <div class="contact-info-container">
            <ul class="contact-item-list">
              ${this.generateContactMethodList()}
            </ul>
          </div>
        </section>
      `
    }

    state.on('lang', lang => {
      this.querySelectorAll('.details').forEach(element => {
        const canonName = element.dataset.name

        this.lang = lang

        const contactMethod = contactMethods.find(
          ({ name }) => name.en === canonName
        )

        element.textContent = contactMethod.details[this.lang]
      })

      this.querySelectorAll('.title').forEach(element => {
        const canonName = element.dataset.name

        this.lang = lang

        const contactMethod = contactMethods.find(
          ({ name }) => name.en === canonName
        )

        element.textContent = contactMethod.name[this.lang]
      })

      this.querySelector(
        '.contact-item-list'
      ).innerHtml = this.generateContactMethodList()
    })

    render()
  }
}

export default { element: SectionHell, name: 'section-hell' }
