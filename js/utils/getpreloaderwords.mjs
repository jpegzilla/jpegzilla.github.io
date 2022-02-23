// ♪音楽 → KITCALIBER - SELF-COFFINIZING : https://www.youtube.com/watch?v=5e9HWwJDtQA

import nouns from '../data/preloaderNouns.mjs'
import adjs from '../data/preloaderAdjectives.mjs'
import text from '../data/preloaderSentences.mjs'
import flavor from '../data/loadingFlavorText.mjs'
import jp from '../data/preloaderJapanese.mjs'

import { getRandomInt, shuffleArray } from './../utils/misc.mjs'

export default () => {
  const rtext = text.splice(getRandomInt(0, text.length), 1)[0]
  const rjp = jp.splice(getRandomInt(0, jp.length), 1)[0]

  const dividers = ['☆', '/', '♡', '☇', '⛧', ' ']

  return {
    adjectives: shuffleArray(adjs),
    nouns: shuffleArray(nouns),
    text: [rtext],
    flavor: [shuffleArray(flavor)],
    jp: rjp,
    divider: dividers[getRandomInt(0, dividers.length)],
  }
}
