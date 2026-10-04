import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
    return (
        <Navbar expand="lg" className="bg-secondary container rounded-2" >
            <Container>
                <Navbar.Brand href="#home">Student MS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={"/"}>Student</Nav.Link>
                        <Nav.Link as={NavLink} to={"/Add"}>Add</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;