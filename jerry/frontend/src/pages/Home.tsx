import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { formatDate } from "@/shared/utils"
import { Icon } from "@/shared/ui"

const Slide = ({
  isActive,
  duration,
}: {
  isActive: boolean
  duration: number
}) => {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        if (!progressRef.current) return

        progressRef.current.style.transition = `width ${duration}ms linear`
        progressRef.current.style.width = "100%"
      }, 50)
    } else {
      if (!progressRef.current) return

      progressRef.current.style.transition = "none"
      progressRef.current.style.width = "0%"
    }
  }, [isActive])

  return (
    <div className={`h-2 w-fit grow my-6`}>
      <div className="w-full h-2 bg-white bg-opacity-30">
        <div className="w-0 h-full bg-white" ref={progressRef}></div>
      </div>
      &nbsp;
    </div>
  )
}

const Slides = ({
  onChange,
  count,
  duration = 10000,
}: {
  onChange: (index: number) => void
  count: number
  duration?: number
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % count)
    }, duration)

    return () => clearTimeout(timer)
  }, [activeIndex])

  useEffect(() => {
    onChange(activeIndex)
  }, [activeIndex, onChange])

  return (
    <div className="flex items-center w-full gap-3">
      {[...Array(count)].map((_, index) => (
        <Slide
          key={index}
          duration={duration}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  )
}

export function HomePage() {
  const slides = [
    {
      title: "Разблокируй город",
      subtitle: "Нажмите на сенсорный экран",
      background: "bg-amber-600",
    },
    {
      title: "Unlock the city",
      subtitle: "Tap on the touch screen",
      background: "bg-green-600",
    },
    {
      title: "Қаланы ашыңыз",
      subtitle: "Сенсорлық экранды басыңыз",
      background: "bg-blue-600",
    },
    {
      title: "Şehrin kilidini aç",
      subtitle: "Dokunmatik ekrana tıklayın",
      background: "bg-red-600",
    },
  ] as const

  const [count] = useState(slides.length)
  const [selectedSlide, setSelectedSlide] = useState(0)

  return (
    <>
      <motion.main
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <Link to="/apps">
          <div
            className={`flex flex-col w-full m-auto h-screen ${slides[selectedSlide].background}`}
          >
            <div className="py-3 px-4 space-y-6 w-full">
              <Slides
                duration={5000}
                count={count}
                onChange={(index) => setSelectedSlide(index)}
              />
              <h1 className="text-white font-medium text-[6em] leading-[6rem]">
                {slides[selectedSlide].title}
              </h1>
              <h2 className="text-white font-medium text-5xl text-opacity-75 leading-[3.5rem]">
                {slides[selectedSlide].subtitle}
              </h2>
            </div>
            <div className="flex  items-center gap-3 text-white font-medium text-xl text-opacity-90 text-right mt-auto px-4 mb-6">
              {formatDate(new Date().toISOString(), "medium")}
            </div>
            <Icon
              name="fluent:tap-double-48-regular"
              className="absolute text-white bottom-2 right-2 w-64 h-auto opacity-50"
            />
          </div>
        </Link>
      </motion.main>
    </>
  )
}
