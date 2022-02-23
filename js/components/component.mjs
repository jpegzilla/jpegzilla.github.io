// ♪音楽 → SYSF. FEAT ANNA - LOOK TO THE SKY : https://youtu.be/NyscF-TXrlk
import typist from './../utils/typist.mjs'
import html from './../utils/html.mjs'

class Component extends HTMLElement {
  addClass(className) {
    this.classList.add(className)
  }

  removeClass(className) {
    this.classList.remove(className)
  }

  toggleClass(className) {
    this.classList.toggle(className)
  }

  setId(id) {
    this.id = id
  }

  getById(id) {
    return this.querySelector(`#${id}`)
  }

  removeAttribute(attr) {
    this.removeAttribute(attr)
  }

  addMultiListener(element, events, fn) {
    events.forEach(ev => {
      element.addEventListener(ev, fn)
    })
  }

  attr(name, val) {
    if (!val) {
      return this.getAttribute(name)
    } else {
      this.setAttribute(name, val)
    }
  }

  toSpans(string) {
    const spans = [...string].map(item => {
      if (item === ' ') return `<span>&nbsp;</span>`
      else return `<span>${item}</span>`
    })

    return spans.join('').replaceAll(/\s|\r|\r?\n/gi, '')
  }

  // ここから何ですか．．．
  async *writeEachWord(text, duration) {
    let x = [...text]

    while (x.length > 0) {
      yield new Promise(resolve => {
        const word = x.shift()
        setTimeout(() => resolve([word]), duration)
      })
    }
  }

  async writeOneByOne(text, element, delay = 50, duration = 150) {
    for await (let word of this.writeEachWord(text, duration)) {
      await typist([word], element, delay)
    }
  }
}

export default Component
