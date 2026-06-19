import { useEffect, useState } from 'react'

const timeFmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' })
const dayFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short' })
const dateFmt = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function WeatherDateTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="weather-widget" aria-label="Date and time">
      <span className="weather-widget__time">{timeFmt.format(now)}</span>
      <span className="weather-widget__sep" aria-hidden="true">
        •
      </span>
      <span className="weather-widget__day">{dayFmt.format(now).toUpperCase()}</span>
      <span className="weather-widget__sep" aria-hidden="true">
        •
      </span>
      <span className="weather-widget__date">{dateFmt.format(now)}</span>
    </div>
  )
}
