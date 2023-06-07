class Minerva {
  static _store = window.localStorage

  static defaults = {
    notes: [],
  }

  static get(key) {
    if (key === undefined)
      throw new Error('Minerva.get must be called with a key.')

    return JSON.parse(Minerva._store.getItem(key))
  }

  static remove(key) {
    if (key === undefined)
      throw new Error('Minerva.remove must be called with a key.')

    return Minerva._store.removeItem(key)
  }

  static set(key, item) {
    try {
      if (key === undefined || item === undefined)
        throw new Error(
          'Minerva.set must be called with both a key and a value.'
        )

      Minerva._store.setItem(key, JSON.stringify(item))

      return Minerva._store
    } catch (err) {
      console.error(err)
      throw new Error(
        `an error occurred while trying to update localStorage: ${err}`
      )
    }
  }
}

/**
 * holds the state of the application in localStorage.
 */
class State {
  constructor(key) {
    if (key.replace(/\s/gi, '').trim() != key) {
      throw new SyntaxError('invalid minerva key format')
    }

    this.events = {}
    this.temp = {}
    this.key = key
    this.store = this.load() || {}
  }

  get audio() {
    return this.store.audio
  }

  get(key) {
    return this.store[key] ? this.store[key] : undefined
  }

  do(event, argument = '') {
    if (this.events[event]) this.events[event].forEach(fn => fn(argument))
  }

  play(sound) {
    this.store.audio && this.audioPlayer.play(sound)
  }

  set(key, val) {
    this.store[key] = val

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
    Minerva.set(this.key, this.store)
  }

  load() {
    return Minerva.get(this.key)
  }
}

export default State
