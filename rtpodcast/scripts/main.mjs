import podcasts from './data.mjs'
import { getTodaysPodcasts } from './utils.mjs'
import { generateICSFileDownload } from './ics.mjs'

getTodaysPodcasts(podcasts)

const icsDownloadLink = document.querySelector('#downloadICS')
const todaysDate = document.querySelector('#todaysDate')
// const today = new Date('2026/05/04')
const today = new Date()

todaysDate.textContent = `${today.getMonth() + 1}/${today.getDate()}`

generateICSFileDownload(icsDownloadLink, podcasts)
