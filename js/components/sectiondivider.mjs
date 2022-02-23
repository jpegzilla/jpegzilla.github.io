// ♪音楽 → 鬱P - ダイヤに乱れはありません (麒麟) : https://youtu.be/JY1PtYcdg_8

import html from './../utils/html.mjs'
import Component from './component.mjs'

class SectionDivider extends Component {
  connectedCallback() {
    this.innerHTML = html`
      <b class="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 619 71.27">
          <defs>
            <style>
              .a {
                stroke-miterlimit: 10;
              }
            </style>
          </defs>
          <path
            shape-rendering="optimizeQuality"
            class="a"
            d="M429.94,55.27c-45.72,0-80.51-7.71-117.13-15.83-37.11-8.23-75.48-16.73-128-17.61C130.7,20.93,75.3,28.61,20.11,44.66l-.28-1c55.29-16.07,110.79-23.76,165-22.87,52.67.88,91.09,9.4,128.24,17.63,40.45,9,78.65,17.44,131.82,15.54,51.46-1.83,102.92-13,153-33.18l.37.93C548,42,496.46,53.16,444.88,55Q437.22,55.27,429.94,55.27Z"
          />
        </svg>
      </b>
    `
  }
}

export default { element: SectionDivider, name: 'section-divider' }
