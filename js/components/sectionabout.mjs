// 音楽 → IRON MAIDEN STRENGTH - WHEN I'M DEAD : https://youtu.be/64rK3suRe28

import { html, printDate, shuffleArray } from './../utils/index.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'
import { logos } from './../data/works.mjs'

let currentSong = 'loading...'
let isB = false

const renderLogo = () => {
  const logo = shuffleArray(logos)[0]
  return html`<img src="${logo.link}" alt="${logo.alt}" />`
}

const copy = {
  bio: {
    en: html`
      <p class="large">
        I want to make the web <span class="emph hl">beautiful.</span>
      </p>

      <p class="large">
        my name is <span class="emph">eris.</span> I'm a twenty-two-year-old
        <span class="emph">creative developer</span> and
        <span class="emph">digital designer.</span>
      </p>

      <p>
        I love designing interactions and creating motion. I want to make
        websites and software that are
        <span class="italic">fun</span> to use &mdash; I think digital
        interfaces are an extremely powerful (and underutilised) medium for
        interactive art.
      </p>

      <p>
        outside of work, I'm very interested in game development, cooking,
        vocaloid, video games, and chiptune.
      </p>

      <p>
        if you need someone like me, I'm currently available. I'm sure we could
        be friends, so please get in touch!
      </p>
    `,
    ja: html`
      <p class="large ja">
        webを美しくしたい。
      </p>

      <p class="large ja">
        エリスと申します。
        私は22歳のクリエイティブデベロッパー兼デジタルデザイナーです。
      </p>

      <p class="ja">
        インタラクションをデザインしたり、モーションを作ったりするのが大好きです。
        楽しいサイトやソフトを作りたい。デジタルインターフェースはインタラクティブアートにとって非常に強いメディアと思います。
      </p>

      <p class="ja">
        仕事以外では、ケーム開発、料理、ボーカロイド、ビデオゲーム、チップチューンにとても興味があります。
      </p>

      <p class="ja">
        私のような人間が必要であれば、現在利用可能です。
        きっと友達になれると思うので、ぜひ連絡をください！
      </p>
    `,
    b: html`
      <p class="large">I make <span class="emph">web software</span>.</p>

      <p>
        I revel in the <span class="emph">purity of pain</span>, the
        <span class="emph">drawing of my blood</span>, the
        <span class="emph">fragmentation of self</span>, tearing my
        consciousness into shiny little pieces &mdash; ripping out parts of
        myself to give <span class="emph">life</span> to new creations.
      </p>

      <p>
        so <span class="emph">draw out my lifeblood</span>, mind-scourging
        nightmare, excruciating psychosis. such brilliant ink paints a dazzling
        picture.
      </p>

      <p>
        let me walk through the water on the border of life and death, of
        reality and the dream &mdash;
        <span class="emph"
          >as I change this world, and this world changes me.</span
        >
      </p>

      <p>
        if you have an interesting idea and you need a special website, then I'm
        the person for you.
      </p>
    `,
  },
}

class SectionAbout extends Component {
  constructor() {
    super()

    this.name = 'sectionabout'
    this.lang = state.get('lang')
  }

  connectedCallback() {
    const sectionId = 'about'

    state.on('lang', lang => {
      this.lang = lang
    })

    const setInnerHtml = () => {
      this.innerHTML = html`
        <section class="intersection-item" id="${sectionId}">
          <header class="intersection-item">
            <span class="intersection-item">about me</span>
          </header>
          <div class="about-info-container">
            <div class="about-info-container-image">
              <div class="about-stats-button"></div>
              <img
                src="./css/img/me/dither-gray-crop-0.png"
                class="me"
                alt=""
              />
              <img src="./css/img/me/hello.gif" class="me animated" alt="" />
              <div class="about-logos-container">
                ${renderLogo()}
              </div>
            </div>
            <div class="about-info-container-text">
              <div class="text-container-main"></div>
              <b></b>
              <div class="text-container-extra">
                <p class="now-playing"></p>
                <p class="awake"></p>
              </div>
            </div>
          </div>
        </section>
      `
    }

    const showTimeStatus = () => {
      const { timeString, awakeOrNot } = printDate()

      const itIs = {
        en: 'it is',
        ja: '在地で',
      }

      const whereILive = {
        en: 'where I live',
        ja: '',
      }

      this.querySelector('.awake').innerHTML = `<span>${
        itIs[this.lang]
      }</span> <time datetime=${timeString}>${timeString}</time> <span>${
        whereILive[this.lang]
      } &mdash;</span> ${awakeOrNot[this.lang]}`
    }

    const showNowPlaying = () => {
      const nowPlaying = {
        en: 'now playing:',
        ja: '再生中:',
      }

      fetch('./../../text/nowplayingmessage.txt')
        .then(res => res.text())
        .then(text => {
          const shouldThisBeALink = text.startsWith('http')

          const newSong = shouldThisBeALink
            ? `<a href="${text}" target="_blank" rel="noreferrer noopener">this music.</a>`
            : text

          if (currentSong !== newSong) currentSong = newSong
        })

      this.querySelector('.now-playing').innerHTML = html`
        ${nowPlaying[this.lang]} <span></span>
      `
      this.querySelector('.now-playing > span').innerHTML = currentSong
    }

    const fillCopy = () => {
      this.querySelector('.text-container-main').innerHTML = copy.bio[this.lang]

      showTimeStatus()
      showNowPlaying()
    }

    setInnerHtml()
    fillCopy()

    this.querySelector('.about-logos-container').addEventListener(
      'click',
      () => {
        if (!isB) {
          this.querySelector('.text-container-main').innerHTML = copy.bio.b

          isB = true
        } else {
          this.querySelector('.text-container-main').innerHTML =
            copy.bio[this.lang]

          isB = false
        }
      }
    )

    state.on('lang', fillCopy)

    // shows whether I am awake or not
    setInterval(showTimeStatus, 500)

    // どんな音楽が再生中?
    setInterval(showNowPlaying, 2000)
  }
}

export default { element: SectionAbout, name: 'section-about' }
