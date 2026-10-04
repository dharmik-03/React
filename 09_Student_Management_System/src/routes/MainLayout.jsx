import Navbars from "../ui/navbar"
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (


 <>
 <Navbars/>
 <Outlet/>
 </>
)
}

export default MainLayout