import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import MainLayout from './routes/MainLayout'
import Error from './ui/Error'
import { lazy, Suspense } from 'react'
import Loading from './ui/Loading'


const Home = lazy(() => import("./components/Student"))


const App = () => {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />

        }
      ]
    }
  ])

  return <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
  </Suspense>
}

export default App