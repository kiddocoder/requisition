"use client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import React from "react"
// import Overview from "./pages/Overview"
// import Requisition from "./pages/Requisition";
import AppLayout from "./components/layouts/AppLayout"
import Approvisionnement from "./pages/Approvisionnement";

function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Approvisionnement />
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

