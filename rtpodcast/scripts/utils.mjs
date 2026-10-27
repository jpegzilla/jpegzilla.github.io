const html = (literals, ...vars) => {
  let raw = literals.raw,
    result = '',
    i = 1,
    len = vars.length + 1,
    str,
    variable

  while (i < len) {
    str = raw[i - 1]
    variable = vars[i - 1]
    result += str + variable
    i++
  }

  result += raw[raw.length - 1]

  return result
}

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export const getTodaysPodcasts = podcasts => {
  // const now = new Date('2026/05/04')
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const dateFormatted = `${month}/${day}`

  const list = document.getElementById('podcastList')

  const podcastData = podcasts.filter(p => {
    const dateComponents = p.episodeDate.split('/')

    return `${dateComponents[0]}/${dateComponents[1]}` === dateFormatted
  })

  if (!podcastData?.length) {
    const htmlData = html` <li>nothing today!</li> `
    list.innerHTML = htmlData
    return
  }

  const htmlData = podcastData
    .map(e => {
      return html`
        <li>
          <a
            title="${e.youtubeLink || e.roosterTeethLink
              ? ''
              : 'no working link available :('}"
            class="${e.youtubeLink || e.roosterTeethLink
              ? 'has-link'
              : 'has-no-link'}"
            href="${e.youtubeLink || e.roosterTeethLink || ''}"
            target="_blank"
            rel="noreferrer"
          >
            <span class="episode-number"> #${e.episodeNumber} </span>
            <span class="supporting-text"> featuring </span>
            <span>${formatter.format(e.guests)}.</span>
            <span class="supporting-text">originally aired:</span>
            <span
              ><time datetime="${new Date(e.episodeDate).toISOString()}"
                >${e.episodeDate}</time
              ></span
            >
            ${e.youtubeLink || e.roosterTeethLink
              ? html`<span class="go-arrow">&rarr;</span>`
              : ''}
          </a>
        </li>
      `
    })
    .join('')

  list.innerHTML = htmlData
}
