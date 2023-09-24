import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { HomePage } from "@/pages/Home"
import { AppsPage } from "@/pages/Apps"
import { PortalsPage } from "@/pages/Portals"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/apps",
    element: <AppsPage />,
  },
  {
    path: "/apps/portals",
    element: <PortalsPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>,
)
