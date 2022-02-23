// ♪音楽 → FATES WARNING - LONG DAY GOOD NIGHT
// : https://www.youtube.com/watch?v=08VIJE7A0C0

import { state } from './../main.mjs'

export const setupIntersector = () => {
  const intersectionItems = document.querySelectorAll('.intersection-item')

  const intersectorOptions = {
    root: null,
    threshold: 0.65
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ intersectionRatio, isIntersecting, target }) => {
      if (intersectionRatio > 0 && isIntersecting) {
        if (target.classList.contains('only-go-back')) return

        target.classList.add('intersector-visible')

        state.do('intersection', { visible: true, elementId: target.id })
      } else if (intersectionRatio > 0 && !isIntersecting) {
        if (!target.classList.contains('dont-go-back'))
          target.classList.remove('intersector-visible')

        state.do('intersection', { visible: false, elementId: target.id })
      }
    })
  }, intersectorOptions)

  intersectionItems.forEach(el => observer.observe(el))

  state.observer = observer
}

const scrollSmooth = (parent, target) => {
  if (target === 'top') {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0
    })
  } else if (target === 'bottom') {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: document.body.scrollHeight
    })
  } else if (target instanceof Node) {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: target.offsetTop
    })
  }
}

export const setupScrolling = () => {
  const links = Array.from(document.querySelectorAll('a'))

  links.forEach(link => {
    link.addEventListener('click', e => {
      if (link.dataset.scroll == 'anchor') {
        e.preventDefault()

        let target = document.querySelector(link.getAttribute('href'))

        scrollSmooth(document.documentElement, target)
      }
    })
  })
}
