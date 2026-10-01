import React from 'react'
import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"
import Navbars from '../components/Navbar'


const MainLayout = () => {
    return (

        <>

            {/* navbar */}


            <Navbars />
            
            <br />
            <br />

            {/* outelet (all componn=ents) */}


            <Outlet />


            <br /><br /><br /><br /><br /><br /><br />
            <br /><br />
            <br />

            {/* footer */}

            <Footer />
        </>
    )
}

export default MainLayout