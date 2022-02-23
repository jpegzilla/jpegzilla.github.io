// ♪音楽 → MATTIAS HÄGGSTRÖM GERDT, DEIA VENGEN - MORNING, THINKER : https://www.youtube.com/watch?v=KLfe1q9vyAg

import html from './../utils/html.mjs'
import Component from './component.mjs'

class SiteUnderlay extends Component {
  constructor() {
    super()

    this.name = 'siteunderlay'
  }

  connectedCallback() {
    this.innerHTML = html`
      <section id="site-underlay">
        <div class="overlay"></div>
        <div class="eclipse-layer">
          <div class="moon-color"></div>
          <div class="moon-outer">
            <b class="moon-inner"></b>
          </div>
        </div>
      </section>
    `

    document.addEventListener('scroll', () => {
      const scrollind = this.querySelector('.moon-inner')
      const delta = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const progress = (delta / height) * 30

      requestAnimationFrame(() => {
        scrollind.style.transform = `translate3d(-${progress}px, 0, 0)`
      })
    })
  }
}

export default { element: SiteUnderlay, name: 'site-underlay' }
