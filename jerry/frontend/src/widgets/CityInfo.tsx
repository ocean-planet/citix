import React, { useState, useEffect, ReactNode } from "react"
import { formatDate } from "@/shared/utils"
import { Icon } from "@/shared/ui"

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  }, [])

  return <>{formatDate(time.toISOString(), "mediumTime")}</>
}

const InfoBadge = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-neutral-800 rounded-lg text-3xl font-medium py-4 px-6 flex items-center gap-2">
      {children}
    </div>
  )
}

export function CityInfo() {
  return (
    <div className="bg-neutral-900 flex rounded-lg py-6 px-5 justify-between items-center">
      <span className="text-4xl font-medium ml-2">
        <CurrentTime />
      </span>
      <div className="flex gap-3">
        <InfoBadge>
          <Icon name="ic:sharp-language" />
          RU
        </InfoBadge>
        <InfoBadge>
          <Icon name="ic:baseline-wifi-off" />
          Free WiFi
        </InfoBadge>
        <InfoBadge>
          <Icon name="mdi:weather-cloudy" />
          Астана
        </InfoBadge>
      </div>
    </div>
  )
}
