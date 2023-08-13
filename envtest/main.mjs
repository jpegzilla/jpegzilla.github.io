import env from './env.mjs'

const { key } = env

document.querySelector('body').textContent = key || 'no key'
