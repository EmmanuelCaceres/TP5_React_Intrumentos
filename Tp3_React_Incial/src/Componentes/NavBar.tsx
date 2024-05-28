import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Usuario from '../Entities/Usuario';

const NavBar = () => {

  const navigate = useNavigate();


  const cerrarSesion = async () => {
    localStorage.setItem('usuario', "");
    localStorage.removeItem('usuario');
    navigate('/login', {
      replace: true,
      state: {
        logged: false
      },
    });
  }

  const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;


  return (
    <>
      <Navbar bg="light" data-bs-theme="light" style={{ marginBottom: "1rem" }}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/donde_estamos">Donde estamos</Nav.Link>
            <Nav.Link href="/instrumentos">Instrumentos</Nav.Link>
            {
              (usuarioLogueado.rol == "Admin")
              ? <Nav.Link href="/instrumento/0">Nuevo</Nav.Link>
              :<div></div>
            }
          </Nav>
          <Nav className="ms-auto">
          <li className="nav-item">
            <span className="nav-link">
              Usuario: {usuarioLogueado?.nombreUsuario} - {usuarioLogueado?.rol}
            </span>
          </li>
          <li className="nav-item">
            <button onClick={cerrarSesion} className="btn btn-success" type="button">
              Cerrar Sesión
            </button>
          </li>
        </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;
