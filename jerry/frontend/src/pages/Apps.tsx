import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CityInfo } from "@/widgets/CityInfo"

export function AppsPage() {
  return (
    <>
      <div className="h-screen bg-black text-white p-4">
        <CityInfo />
        <motion.main
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="grid auto-rows-[192px] grid-cols-3 gap-4 mt-4">
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 ">
              0
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 ">
              1
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 ">
              2
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 col-span-2">
              3
            </div>
            <Link
              to="/apps/portals"
              className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 "
            >
              Portals
            </Link>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 ">
              5
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 col-span-2">
              6
            </div>

            {/* {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`row-span-1 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 ${
                  i === 3 || i === 6 ? "col-span-2" : ""
                }`}
              >
                {i}
              </div>
            ))} */}
          </div>
        </motion.main>
      </div>
    </>
  )
}
