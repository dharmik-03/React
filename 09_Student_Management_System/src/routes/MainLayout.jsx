import { Suspense } from "react"
import Navbars from "../ui/navbar"
import { Outlet } from 'react-router-dom'
import Loading from "../ui/Loading"


const MainLayout = () => {
  return (


    <>
      <Navbars />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense> </>
  )
}

export default MainLayout