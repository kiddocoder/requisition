"use client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import React from "react"
// import Overview from "./pages/Overview"
// import Requisition from "./pages/Requisition";
import AppLayout from "./components/layouts/AppLayout"
import Approvisionnement from "./pages/Approvisionnement";
import Onboarding from "./pages/OnBoarding"
import Login from "./pages/Login"
import Requisition from "./pages/Requisition"
import Comptanility from "./pages/Comptanility"
import RequisitionApproval from "./components/forms/Direction/RequisitionApproval"
import Directeur from "./pages/Directeur"

function App(): React.ReactElement {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <AppLayout />,
    //   children: [
    //     {
    //       path: "/",
    //       element: <Approvisionnement />
    //     }
    //   ]
    // }
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <Onboarding />
    },
    {
      path: "/requisition",
      element: <Requisition />
    },
    {
      path: "/approvisionnement",
      element: <Approvisionnement />
    },
    {
      path: "/comptabilite",
      element: <Comptanility />
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/direction",
          element: <Directeur />
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

