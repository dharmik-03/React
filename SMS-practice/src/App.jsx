import React, { Suspense } from 'react'
import StudentPage from './components/student'
import StudentForm from './components/studentForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from "./routes/MainLayout"

const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <StudentPage />
        },
        {
          path: "add",
          element: <StudentForm />
        },
        {
          path:"edit/:id",
          element:<StudentForm/>
        }
      ]
    }
  ])



  return (
    <Suspense>

      <RouterProvider router={router} />

    </Suspense>

  )
}

export default App