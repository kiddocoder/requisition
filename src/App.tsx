"use client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import React from "react"
// import Overview from "./pages/Overview"
import AppLayout from "./components/layouts/AppLayout"
import Approvisionnement from "./pages/Approvisionnement";
import Onboarding from "./pages/OnBoarding"
import Login from "./pages/Login"
import Requisition from "./pages/Requisition"
import Comptanility from "./pages/Comptanility"
import Directeur from "./pages/Directeur"
import SignUp from "./pages/SignUp"
import Overview from "./pages/Overview"
import Accounter from "./components/forms/Accounter/Accounter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./pages/Dashboard"

function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/inscription",
      element: <SignUp />
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
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/direction",
          element: <Directeur />
        },
        {
          path: "/accueil",
          element: <Overview />
        },
        {
          path: "/approvisionnement",
          element: <Approvisionnement />
        },
        {
          path: "/comptabilite",
          element: <Accounter />
        },
        {
          path: "/comptability/requisition/:id",
          element: <Comptanility />
        },
      ]
    }

  ]
  )
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}


export default App

