import Navbars from "../ui/navbar"
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from "react-bootstrap"


const MainLayout = () => {
  return (


    <>
      <Container>
        <Row>
          <Col>
            <Navbars />
            <Outlet />
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default MainLayout