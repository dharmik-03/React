import React, { lazy, Suspense } from 'react'

import MainLayout from './routes/MainLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/Error'
import Loading from './components/Loading'



const Home = lazy(() => import("./components/Home"))
const About = lazy(() => import("./components/About"))
const Service = lazy(() => import("./components/Service"))
const Product = lazy(() => import("./components/Product"))

const App = () => {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,

        },
        {
          path: "product/:id",
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


  return <Suspense fallback={<Loading />}>

    <RouterProvider router={router} />

  </Suspense>

}

export default App