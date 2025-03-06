"use client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import React from "react"
import Overview from "./pages/Overview"
import AppLayout from "./components/layouts/AppLayout"

function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Overview />
        }
      ]
    }
  ]
  )
  return (
    <RouterProvider router={router} />
  )
}


export default App

