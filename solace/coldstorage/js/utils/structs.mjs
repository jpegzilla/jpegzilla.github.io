import { uuidv4 } from './string.mjs'

export class Note {
  constructor() {
    this.id = uuidv4()
    this.title = ''
    this.content = ''
    this.timestamp = new Date().getTime()
  }

  set title(string) {
    this.title = string
  }

  set content(string) {
    this.content = string
  }
}
export class Notepad {
  /**
   * initialize a notepad structure.
   * @param {string} notes json representation of notes.
   */
  constructor(notes) {}
}
