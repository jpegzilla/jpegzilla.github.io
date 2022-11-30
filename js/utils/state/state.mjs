// ♪音楽 → LANGE FEAT. SKYE - DRIFTING AWAY : https://www.youtube.com/watch?v=ktmcNflvDwk

import minerva from './minerva.mjs'
import audiomanager from './../audiomanager.mjs'

class State {
  constructor(key) {
    if (key.replace(/\s/gi, '').trim() != key) {
      throw new SyntaxError('invalid minerva key format')
    }

    this.audioPlayer = new audiomanager({
      volume: {
        effect: 0, // sound disabled for now
      },
    })

    this.audioPlayer.load([
      { file: './../../audio/click_small.wav', name: 'key' },
    ])

    this.events = {}
    this.temp = {}
    this.key = key
    this.store = this.load() || {}
    this.store.audio = this.store.audio || true
  }

  get audio() {
    return this.store.audio
  }

  get(key) {
    return this.store[key] ? JSON.parse(this.store[key]) : undefined
  }

  do(event, argument = '') {
    if (this.events[event]) this.events[event].forEach(fn => fn(argument))
  }

  play(sound) {
    this.store.audio && this.audioPlayer.play(sound)
  }

  set(key, val) {
    this.store[key] = JSON.stringify(val)

    if (this.events[key]) this.events[key].forEach(fn => fn(val))

    this.save()

    return this
  }

  place(key, item) {
    this.temp[key] = item
  }

  on(ev, fn) {
    if (this.events[ev]) this.events[ev].push(fn)
    else this.events[ev] = [fn]
  }

  remove(key) {
    delete this.store[key]

    return this
  }

  save() {
    minerva.set(this.key, this.store)
  }

  load() {
    minerva.get(this.key)
  }
}

export default State
