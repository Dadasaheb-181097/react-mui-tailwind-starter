import { useEffect, useMemo, useState } from 'react'

export function WeatherDateTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const time = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(now)
  }, [now])

  const day = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(now).toUpperCase()
  }, [now])

  const date = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(now)
  }, [now])

  return (
    <div className="weather-widget" aria-label="Date and time">
      <span className="weather-widget__time">{time}</span>
      <span className="weather-widget__sep" aria-hidden="true">
        •
      </span>
      <span className="weather-widget__day">{day}</span>
      <span className="weather-widget__sep" aria-hidden="true">
        •
      </span>
      <span className="weather-widget__date">{date}</span>
    </div>
  )
}
