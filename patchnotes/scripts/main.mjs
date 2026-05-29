// utils
let versionNumber

// min and max inclusive
const randomNumber = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generatePatchNumber = (usePatch = true) => {
  const major = randomNumber(0, 10)
  const minor = randomNumber(0, 10)

  let version = `${major}.${minor}`

  if (usePatch) {
    const patch = randomNumber(0, 10)
    version += `.${patch}`
  }

  return version
}

// notes
// should there just be a link that randomizes every time you click?
// should the input be freeform or just there to show the number?
// no the input was better
// no just kidding made the input into just a link that gets randomized

// elements
/**
 * @type {HTMLInputElement}
 */
const patchToggle = document.querySelector('#version-patch-toggle')
const randomizeButton = document.querySelector('#randomize-button')
const versionNumberDisplay = document.querySelector('.version-number')
const patchNotesInput = document.querySelector('#patch-notes-input')
const patchNotesLink = document.querySelector('#patch-notes-link')

// functionality
let shouldUsePatchVersion = patchToggle.checked

const updatePatchNumber = () => {
  versionNumber = generatePatchNumber(shouldUsePatchVersion)

  versionNumberDisplay.innerHTML = `&nbsp;${versionNumber}&nbsp;`
  patchNotesLink.href = `https://www.google.com/search?q=${encodeURIComponent(
    versionNumber
  )}+patch+notes&udm=14`
}

updatePatchNumber()

// events
patchToggle.onchange = e => {
  shouldUsePatchVersion = e.target.checked
  updatePatchNumber()
}

randomizeButton.onclick = () => {
  updatePatchNumber()
}
