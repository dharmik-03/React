import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import MainLayout from './routes/MainLayout'
import Error from './ui/Error'
import { lazy, Suspense } from 'react'
import Loading from './ui/Loading'
import AddStudent from './components/AddStudent'


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

        },
        {
          path:"add",
          element:<AddStudent/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />

}

export default App