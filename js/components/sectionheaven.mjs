// ♪音楽 → ヤバイTシャツ屋さん - ハッピーウェディング前ソング : https://www.youtube.com/watch?v=duWW0G-zesY

import html from './../utils/html.mjs'
import Component from './component.mjs'
import { state } from './../main.mjs'

const copy = {
  en: html`
    <div>
      <span>artist & creative developer.</span>
      <span class="not-on-mobile">I treasure motion, color,</span>
      <span class="not-on-mobile">and interaction design.</span>
      <aside>
        <span>I'm currently looking for new projects &mdash;</span>
        <span>let's make something cool together!</span>
      </aside>
    </div>
  `,
  ja: html`
    <div class="ja">
      <span>アーティスト＆</span>
      <span>クリエイティブデベロッパー。</span>
      <span class="not-on-mobile">動き、色、インタラクション</span>
      <span class="not-on-mobile">を大切にしている。</span>
      <aside>
        <span>現在、新しいプロジェクトを探しています &mdash;</span>
        <span>一緒にかっこいいものを作りましょう！</span>
      </aside>
    </div>
  `,
}

class SectionHeaven extends Component {
  constructor() {
    super()

    this.name = 'sectionheaven'
    this.lang = state.get('lang')
  }

  connectedCallback() {
    const sectionId = 'heaven'

    state.on('lang', lang => {
      this.lang = lang
    })

    const render = () => {
      this.innerHTML = html`
        <main class="intersection-item" id="${sectionId}">
          ${copy[state.get('lang')]}
        </main>
      `
    }

    render()

    state.on('lang', () => render())
  }
}

export default { element: SectionHeaven, name: 'section-heaven' }
