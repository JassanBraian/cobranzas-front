import React from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    const navigate = useNavigate();

    const goToPage = page => {
        navigate(page)
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link onClick={() => goToPage('/')}>UTN FRT</Nav.Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => goToPage('/')}>Home</Nav.Link>
                        <Nav.Link onClick={() => goToPage('/carreras')}>Carreras</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;