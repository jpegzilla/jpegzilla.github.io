const webglScripts = {
  purple: './../../webgl/frag.frag'
}

const scriptMapValues = Object.values(webglScripts)
const scriptMapKeys = Object.keys(webglScripts)

export default () =>
  Promise.all(
    scriptMapValues.map((s, i) =>
      fetch(s).then(r =>
        r.text().then(text => ({ name: scriptMapKeys[i], text }))
      )
    )
  ).then(allScripts => {
    const scripts = {}

    allScripts.forEach(({ name, text }) => (scripts[name] = text))

    return { webgl: scripts }
  })
