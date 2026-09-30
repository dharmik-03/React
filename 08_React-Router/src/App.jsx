import React from 'react'

import MainLayout from './routes/MainLayout'
import Home from "./components/Home"
import Product from "./components/Product"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Service from './components/Service'
import About from './components/About'



const App = () => {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,

        },
        {
          path: "product",
          element: <Product />
        },
        {
          path: "service",
          element: <Service />
        },
        {
          path: "about",
          element: <About />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App