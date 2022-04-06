const FILES_TO_CACHE = [
  '/',
  '404.html',
  'browserconfig.xml',
  'manifest.json',
  'favicon.ico',
  'credits.html',
  'audio/click_small.wav',
  'humans.txt',
  'index.html',

  // fonts
  'css/fonts/CrimsonText-Regular.ttf',
  'css/fonts/NunitoSans-Regular.ttf',
  'css/fonts/NunitoSans-Italic.ttf',
  'css/fonts/epson-kaisho.woff',
  'css/fonts/MSGothic.ttf',
  'css/fonts/Prompt-Light.ttf',
  'css/fonts/Prompt-Medium.ttf',
  'css/fonts/Prompt-Regular.ttf',
  'css/fonts/Prompt-MediumItalic.ttf',
  'css/fonts/NeutralFace.otf',

  // mtns icons
  'css/img/mtns-icons/red_heart.svg',
  'css/img/mtns-icons/furry_pride.svg',
  'css/img/mtns-icons/bisexual_flag.svg',
  'css/img/mtns-icons/maple_leaf.svg',
  'css/img/mtns-icons/pirate_flag.svg',
  'css/img/mtns-icons/transgender_flag.svg',
  'css/img/mtns-icons/gamepad.svg',

  // my icons
  'css/img/logos/desperateprayer-1.svg',
  'css/img/logos/desperateprayer-2.svg',
  'css/img/logos/kaijuu-1.svg',
  'css/img/logos/kaijuu-2.svg',
  'css/img/logos/larkspur-alpha.svg',
  'css/img/logos/larkspur-beta.svg',
  'css/img/logos/minervasystem-1.svg',
  'css/img/logos/minervasystem-2.svg',
  'css/img/logos/mothermoon-1.svg',
  'css/img/logos/mothermoon-2.svg',
  'css/img/logos/ninth-infinite-1.svg',
  'css/img/logos/self-made.svg',
  'css/img/logos/semihumanlab-1.svg',
  'css/img/logos/transhumanism-1.svg',

  // images
  'css/img/me/dither-gray-crop-0.png',
  'css/img/me/dither-gray-crop-transparent.png',
  'css/img/me/dither-gray-crop.png',
  'css/img/me/hello.gif',
  'css/img/social/discord.svg',
  'css/img/social/github.svg',
  'css/img/social/twitter.svg',
  'css/img/textures/grid-me.png',
  'css/img/textures/noise.png',
  'css/img/textures/noise_2.png',

  // styles
  'css/main.min.css',
  'docs/resume.html',
  'docs/resume.min.css',
  'docs/resume.min.css.map',
  'css/404.min.css',
  'css/credits.min.css',

  // scripts
  'js/main.mjs',
  'js/components/component.mjs',
  'js/components/index.mjs',
  'js/components/loadingscreen.mjs',
  'js/components/sectionabout.mjs',
  'js/components/sectiondivider.mjs',
  'js/components/sectionfooter.mjs',
  'js/components/sectionheaven.mjs',
  'js/components/sectionhell.mjs',
  'js/components/sectionworks.mjs',
  'js/components/sitecontrols.mjs',
  'js/components/siteheader.mjs',
  'js/components/siteoverlay.mjs',
  'js/components/siteunderlay.mjs',
  'js/components/wordmark.mjs',
  'js/data/loadingFlavorText.mjs',
  'js/data/preloaderAdjectives.mjs',
  'js/data/preloaderJapanese.mjs',
  'js/data/preloaderNouns.mjs',
  'js/data/preloaderSentences.mjs',
  'js/data/translate.json',
  'js/data/works.mjs',
  'js/utils/audiomanager.mjs',
  'js/utils/canvas/shaderTools.mjs',
  'js/utils/cheatcodes.mjs',
  'js/utils/checksupports.mjs',
  'js/utils/colortools.mjs',
  'js/utils/elements.mjs',
  'js/utils/getjson.mjs',
  'js/utils/getpreloaderwords.mjs',
  'js/utils/html.mjs',
  'js/utils/index.mjs',
  'js/utils/langtools.mjs',
  'js/utils/loadallwebgl.mjs',
  'js/utils/misc.mjs',
  'js/utils/mobilecheck.mjs',
  'js/utils/scroll.min.mjs',
  'js/utils/temporalinfo.mjs',
  'js/utils/typist.mjs',
  'js/utils/state/minerva.mjs',
  'js/utils/state/state.mjs',

  // app images
  'css/img/app/android-icon-36x36.png',
  'css/img/app/android-icon-48x48.png',
  'css/img/app/android-icon-72x72.png',
  'css/img/app/android-icon-96x96.png',
  'css/img/app/android-icon-144x144.png',
  'css/img/app/android-icon-192x192.png',
  'css/img/app/apple-icon-57x57.png',
  'css/img/app/apple-icon-60x60.png',
  'css/img/app/apple-icon-72x72.png',
  'css/img/app/apple-icon-76x76.png',
  'css/img/app/apple-icon-114x114.png',
  'css/img/app/apple-icon-120x120.png',
  'css/img/app/apple-icon-144x144.png',
  'css/img/app/apple-icon-152x152.png',
  'css/img/app/apple-icon-180x180.png',
  'css/img/app/apple-icon-precomposed.png',
  'css/img/app/apple-icon.png',
  'css/img/app/favicon-16x16.png',
  'css/img/app/favicon-32x32.png',
  'css/img/app/favicon-96x96.png',
  'css/img/app/favicon.ico',
  'css/img/app/ms-icon-70x70.png',
  'css/img/app/ms-icon-144x144.png',
  'css/img/app/ms-icon-150x150.png',
  'css/img/app/ms-icon-310x310.png',
]

const JPEGZILLA_VERSION = '6.006'
const CACHE_NAME = `jpegzilla_${JPEGZILLA_VERSION}`
const cacheWhitelist = [CACHE_NAME]

self.addEventListener('install', event => {
  self.skipWaiting()

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('[serviceworker] pre-caching offline page')
        return cache.addAll(FILES_TO_CACHE)
      })
      .then(() => {
        caches.keys().then(keyList => {
          return Promise.all(
            keyList.map(key => {
              if (cacheWhitelist.indexOf(key) === -1) {
                console.log('[serviceworker] removing old key in cache: ', key)
                return caches.delete(key)
              }
            })
          )
        })
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys.map(key => {
          if (![CACHE_NAME].includes(key)) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    console.log('[serviceworker] fetch event ignored - not a get request')
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(response => {
        if (response) return response

        return fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
      })
    )
  )
})
