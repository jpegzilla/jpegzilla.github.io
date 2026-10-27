const buildICSDate = date => {
  const t = new Date()
  const formatted = `${t.getFullYear()}${
    t.getMonth() + 1
  }${t.getDate()}T${t.getHours()}${t.getMinutes()}${t.getSeconds()}Z`

  return formatted
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const createICSEvent = ({
  day,
  month,
  year,
  url,
  episodeNumber,
  episodeTitle,
}) => {
  const formattedDate = buildICSDate()

  return `BEGIN:VEVENT
DTSTAMP:${formattedDate}
UID:${formattedDate}+${uuidv4()}
DTSTART;VALUE=DATE:${year}${month}${day}
RRULE:FREQ=YEARLY;BYMONTH=${month};BYMONTHDAY=${day}
DTEND;VALUE=DATE:${year}${month}${parseInt(day) + 1}
SUMMARY:RT podcast episode #${episodeNumber}
URL:${url}
DESCRIPTION:${episodeTitle}
LOCATION:${url}
TRANSP:TRANSPARENT
X-MICROSOFT-CDO-BUSYSTATUS:FREE
CLASS:PRIVATE
END:VEVENT`
}

const createCalendar = events => {
  const icsEvents = events
    .map(event => {
      const date = event.episodeDate.split('/')
      return createICSEvent({
        month: date[0],
        day: date[1],
        year: date[2],
        url: event.youtubeLink,
        episodeNumber: event.episodeNumber,
        episodeTitle: event.episodeTitle,
      })
    })
    .join('\n')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//jpegzilla.com//rtpodcast calendar
${icsEvents}
END:VCALENDAR`
}

export const generateICSFileDownload = (downloadButton, data) => {
  const rawCalendarText = createCalendar(data)

  downloadButton.setAttribute(
    'href',
    'data:text/calendar;charset=utf8,' + encodeURIComponent(rawCalendarText)
  )
  downloadButton.setAttribute('download', 'rooster teeth podcast calendar')
}
