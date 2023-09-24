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

  return <>{formatDate(time.toISOString(), "shortTime")}</>
}

const InfoBadge = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-neutral-800 rounded-lg text-lg font-medium py-2 px-4 flex items-center gap-2">
      {children}
    </div>
  )
}

export function CityInfo() {
  return (
    <div className="bg-neutral-900 flex rounded-lg py-3 px-3 justify-between items-center">
      <span className="text-lg font-medium ml-2">
        <CurrentTime />
      </span>
      <div className="flex gap-3">
        <InfoBadge>
          <Icon name="ic:sharp-language" />
          Ru
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
