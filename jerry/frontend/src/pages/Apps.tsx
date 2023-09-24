import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CityInfo } from "@/widgets/CityInfo"
import React, { useEffect, useState } from "react"

import weatherIcon from "../images/weather.jpg"

export function AppsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://sekta.sailaubek.dev/api/news")
      .then((response) => response.json())
      .then((fetchData) => {
        setData(fetchData.data.news)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="h-screen bg-black text-white p-4">
        <CityInfo />
        <motion.main
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div class="grid auto-rows-[400px] grid-cols-3 gap-4 m-6">
            <div class="group relative row-span-1 items-start justify-center rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-[3.5rem] bg-gradient-to-r from-gray-600 to-blue-400 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-[3.5rem] bg-blue-600 w-[29vw] h-[29vw] leading-none text-white">
                    <img
                      src={weatherIcon}
                      className="rounded-[3.5rem] object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div class="relative row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-700 to-yellow-600 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-amber-700 w-[29vw] h-[20vh] leading-none text-white"></button>
                </div>
              </div>
            </div>

            <div class="group relative row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-red-600 to-red-400 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-red-600 w-[30vw] h-[20vh] leading-none"></button>
                </div>
              </div>
            </div>

            <div class="group relative col-span-2 row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-gray-100 h-[20vh] w-[61vw] leading-none"></button>
                </div>
              </div>
            </div>

            <div class="group relative row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <Link
                    to="/apps/portals"
                    className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 "
                  >
                    <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-gradient-to-t from-yellow-400 to-blue-600 h-[20vh] w-[30vw] leading-none"></button>
                  </Link>
                </div>
              </div>
            </div>

            <div class="group relative row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-green-600 h-[20vh] w-[29vw] leading-none"></button>
                </div>
              </div>
            </div>

            <div class="group relative col-span-2 row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white to-white px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex items-center divide-x divide-gray-600 rounded-xl bg-gray-200 h-[20vh] w-[62vw] leading-none"></button>
                </div>
              </div>
            </div>

            <div class="group relative col-span-2 row-span-1 rounded-xl">
              <div class="grid justify-start">
                <div class="group relative">
                  <div class="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-950 px-10 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <button class="relative flex divide-x divide-gray-600 rounded-xl bg-gray-200 h-[20vh] w-[95vw] leading-none">
                    <div className="text-black p-6">
                      <div className="font-bold text-2xl">Новости</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </>
  )
}
