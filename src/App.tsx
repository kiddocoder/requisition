"use client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import React from "react"
// import Overview from "./pages/Overview"
import Requisition from "./pages/Requisition";
import AppLayout from "./components/layouts/AppLayout"

function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Requisition />
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

