import React from 'react'
import { Outlet } from "react-router-dom"

import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import Navbars from '../components/Navbar'
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const MainLayout = () => {
    return (

        <>


            <Navbars />
            <br />
            <br />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/product">
                    Product
                </Breadcrumb.Item>
                <Breadcrumb.Item href='/service'>Service</Breadcrumb.Item>
                <Breadcrumb.Item href='/about'>About</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <br />
            <Outlet />
            <br /><br /><br /><br /><br /><br /><br />
            <Footer />
        </>
    )
}

export default MainLayout