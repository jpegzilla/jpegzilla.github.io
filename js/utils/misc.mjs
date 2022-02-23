export const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(max))
    throw new TypeError('getRandomInt must be called with two numbers.')

  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // the maximum is exclusive and the minimum is inclusive
}

export const replaceAt = (string, index, replaceWith) =>
  string.substr(0, index) +
  replaceWith +
  this.substr(index + replaceWith.length)

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const interleave = (a1, a2) => {
  return a1.map((val, idx) => [val, a2[idx]])
}

const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1,
}

const preventDefault = e => {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

const preventDefaultForScrollKeys = e => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

export const disableScroll = () => {
  if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  document.addEventListener('wheel', preventDefault, {
    passive: false,
  })
  window.onwheel = preventDefault
  window.onmousewheel = document.onmousewheel = preventDefault
  window.ontouchmove = preventDefault
  document.onkeydown = preventDefaultForScrollKeys
}

export const enableScroll = () => {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  document.removeEventListener('wheel', preventDefault, {
    passive: false,
  })
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}

const scrollSmooth = (parent, target) => {
  if (target == 'top') {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    })
  } else if (target == 'bottom') {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: document.body.scrollHeight,
    })
  } else if (target instanceof Node) {
    parent.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: target.offsetTop,
    })
  }
}

export const setupScrollingInteractions = () => {
  const allItems = Array.from(document.querySelectorAll('.intersection-item'))
  const allSections = Array.from(document.getElementsByTagName('section'))
  const intersectionItems = [...allItems, ...allSections]

  const intersectorOptions = {
    root: null,
    threshold: 0.5,
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 && entry.isIntersecting) {
        if (!entry.target.classList.contains('visible')) {
          entry.target.classList.add('visible')
        }
      }
    })
  }, intersectorOptions)

  intersectionItems.forEach(item => observer.observe(item))

  const links = Array.from(document.querySelectorAll('a'))

  links.forEach(link => {
    link.addEventListener('click', e => {
      if (link.dataset.scroll === 'anchor') {
        e.preventDefault()
        let target = document.querySelector(link.getAttribute('href'))
        scrollSmooth(document.documentElement, target)
      }
    })
  })
}

export const addMultiListener = (element, events, fn) => {
  events.forEach(ev => {
    element.addEventListener(ev, fn)
  })
}

export const shuffleArray = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[a[i], a[j]] = [a[j], a[i]]
  }

  return a
}

export const shuffleNoDupes = (array, start = 0, end, key) => {
  const res = []

  if (key) {
    array.forEach(elem => {
      if (!res.some(x => x[key].includes(elem[key].split('-')[0]))) {
        res.push(elem)
      }
    })
  } else {
    array.forEach(elem => {
      if (!res.some(x => x.includes(elem.split('-')[0]))) {
        res.push(elem)
      }
    })
  }

  return shuffleArray(res.slice(start, end))
}

export const hotkey = (key, fn) => {
  window.addEventListener('keydown', ({ key: eventKey, repeat }) => {
    if (repeat) return
    if (eventKey === key) fn()
  })
}

export const keycodes = {
  space: ' ',
  enter: 'Enter',
}

export const weightedRandom = distribution => {
  let i,
    sum = 0

  for (i in distribution) {
    sum += distribution[i]
    if (Math.random() <= sum) return i
  }
}
