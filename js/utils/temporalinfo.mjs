// ♪音楽 → ハチ - 砂の惑星 : https://www.youtube.com/watch?v=AS4q9yaWJkI

const WAKING_TIME = '9:00'
const SLEEPING_TIME = '23:00'

export const printDate = () => {
  const changeTimezone = (date, ianatz) => {
    let invdate = new Date(
      date.toLocaleString('en-US', {
        timeZone: ianatz,
      })
    )

    let diff = date.getTime() - invdate.getTime()

    return new Date(date.getTime() + diff)
  }

  const today = changeTimezone(new Date(), 'America/New_York')

  const hour = today
    .getHours()
    .toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
    .padStart(2, '0')
  const minute = today
    .getMinutes()
    .toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
    .padStart(2, '0')
  // const second = today
  //   .getSeconds()
  //   .toLocaleString('en-US', {
  //     timeZone: 'America/New_York',
  //   })
  //   .padStart(2, '0')

  const timeString = `${hour}:${minute}`

  let awakeOrNot

  const getMinutes = str => {
    const time = str.split(':')
    return time[0] * 60 + time[1] * 1
  }

  const getMinutesNow = () => {
    const timeNow = changeTimezone(new Date(), 'America/New_York')
    return timeNow.getHours() * 60 + timeNow.getMinutes()
  }

  const now = getMinutesNow()
  const start = getMinutes(WAKING_TIME)
  let end = getMinutes(SLEEPING_TIME)
  if (start > end) end += getMinutes('24:00')

  if (now >= start && now <= end) {
    awakeOrNot = {
      en: 'I am likely awake.',
      ja: 'どうやら起きた。',
    }
  } else
    awakeOrNot = {
      en: 'I am probably sleeping.',
      ja: '今寝ます。',
    }

  const commsRecommendation =
    awakeOrNot == 'awake'
      ? 'why not send a me message?'
      : "if you send a message now, I'll get back to you when I wake up!"

  return {
    timeString,
    awakeOrNot,
    commsRecommendation,
  }
}
