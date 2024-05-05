import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ()=>{
    return(
        <>
      <Navbar bg="light" data-bs-theme="light" style={{marginBottom: "1rem"}}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/donde_estamos">Donde estamos</Nav.Link>
            <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
            <Nav.Link href="/instrumento/0">Nuevo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    )
}

export default NavBar;
