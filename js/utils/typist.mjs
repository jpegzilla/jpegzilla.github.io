import { getRandomInt } from './misc.mjs'
import { state } from './../main.mjs'

export const loadingNumber = (min, max, element, delay = 50, append = '') => {
  let count = min
  element.textContent = count

  const counter = setInterval(() => {
    element.textContent = `${++count}${append}`

    if (count == max) clearInterval(counter)
  }, delay)
}

export const charsToHex = string => {
  const converted = [...string.replace(/\s/gi, '')]
    .map(c => c.charCodeAt(0).toString(16))
    .join('')

  const split = converted
    .toUpperCase()
    .padEnd(16, '0')
    .match(/.{1,4}/g)

  return split.join(' ')
}

export const scrambleOver = (text, element, delay = 50) => {
  const elementStyle = getComputedStyle(element)
  const display = elementStyle.getPropertyValue('display')

  if (display === 'none') return

  let count = 0
  let length = 19

  return new Promise((resolve, reject) => {
    let lineWrite = setInterval(() => {
      if (count < length) {
        const replacedText = element.textContent.split('')
        replacedText[count] = text[count] === ' ' ? ' ' : text[count]

        element.innerText = replacedText.join('')
      }

      count++

      if (count == length) {
        clearInterval(lineWrite)
        resolve()
      }

      if (count > length) reject()
    }, delay)
  })
}

export default (
  arr,
  element,
  delay = 50,
  sound = false,
  scramble = true,
  stateObject = null
) => {
  const elementStyle = getComputedStyle(element)
  const display = elementStyle.getPropertyValue('display')

  if (display === 'none') return

  let random = arr[Math.floor(Math.random() * arr.length)]

  let line = random
    .map(a => a.replace(/\s/gi, `\u00A0`))
    .map(b => b + '\n')
    .join('')

  let count = 0
  let length = line.length

  return new Promise((resolve, reject) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*'

    const getRandomChar = chars => {
      return chars[getRandomInt(0, chars.length)]
    }

    let lineWrite = setInterval(() => {
      const next = count + 1

      if (count < line.length - 1) {
        const c = count == length - 2
        const a = c ? '' : scramble ? getRandomChar(chars) : ''

        element.innerText = line.slice(0, next) + a

        // if (sound) state.play('key')
      }

      count++

      if (count == length - 1) {
        clearInterval(lineWrite)
        resolve()
      }

      if (count > length) reject()
    }, delay)

    if (stateObject) stateObject.place('typist', lineWrite)
  })
}
