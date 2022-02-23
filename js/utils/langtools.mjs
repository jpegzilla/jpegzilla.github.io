export const getLang = () => {
  if (navigator.languages)
    return navigator.languages[0].toLowerCase().split('-')[0]

  return navigator.language
}

export const supportedLangs = {
  en: { code: 'en', native: 'hello' },
  ja: { code: 'ja', native: 'こんにちは' }
}

export const translationToUse = supportedLangs[getLang()] || supportedLangs.en
