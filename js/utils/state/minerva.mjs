// ♪音楽 → KITCALIBER - THE END : https://youtu.be/v_nGQHsBxv4?t=1379

export class Minerva {
  static _store = window.localStorage

  static defaults = {
    volume: {
      effect: 100,
      voice: 100
    }
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

export default Minerva
