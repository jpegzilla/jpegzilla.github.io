import { uuidv4 } from './misc.mjs'
import minerva from './state/minerva.mjs'
import { state } from './../main.mjs'

export default class AudioManager {
  constructor(options) {
    this.ctx = new AudioContext()

    // contains sounds loaded via the load function
    this.sounds = {}

    // contains the current playing sounds
    this.sources = []

    // contains minerva's stored settings or the default ones
    this.settings = options ? options : minerva.defaults
  }

  play(name) {
    if (!state.audio) return

    const id = uuidv4()

    const source = this.ctx.createBufferSource()
    const gainNode = this.ctx.createGain()
    source.connect(gainNode)
    gainNode.connect(this.ctx.destination)

    this.sources.push({ name, id, source, state: 'running' })
    source.buffer = this.sounds[name]
    source.connect(this.ctx.destination)

    if (this.sources.find(item => item.name === name)) {
      if (this.sources.every(item => item.name === name).state === 'running')
        return
    }

    const { effect } = this.settings.volume

    gainNode.gain.setValueAtTime(effect / 100, this.ctx.currentTime)

    if (gainNode.gain.value > 0) source.start()

    // whenever a sound stops, it's state is set to stopped, and it is removed
    // from the array of sources. this is to help when detecting sounds that might
    // be inappropriately running at the same time and overlapping.
    source.addEventListener('ended', () => {
      this.sources = this.sources.map(i => {
        if (i.id === id)
          return {
            ...i,
            state: 'stopped'
          }
        else return i
      })

      this.sources.unshift()
    })
  }

  close() {
    this.ctx.close()
  }

  unload() {
    this.sources = {}
  }

  load(paths) {
    return new Promise((resolve, reject) => {
      paths.forEach(async (path, i) => {
        try {
          const res = await fetch(path.file)
          const buf = await res.arrayBuffer()
          await this.ctx.decodeAudioData(buf, buffer => {
            this.sounds[path.name] = buffer
            if (i === paths.length - 1) resolve(this.sounds)
          })
        } catch (err) {
          console.log({ err })
          reject(err)
        }
      })
    })
  }
}
