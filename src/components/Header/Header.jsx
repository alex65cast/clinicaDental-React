import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../layouts/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMediaQuery } from 'react-responsive';

export const Header = () => {
  const datosUserRedux = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    console.log(datosUserRedux, "tioooooooooooo")
  }, [])

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));

    setTimeout(() => {
      navigate("/login");
    }, 500)
  }

  return (
    <div className="headerDesign">
      <Navbar className="headerDesign" expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className="link"><img src="https://ofallondentalworks.com/wp-content/uploads/2020/05/ODW-Cosmetic-Dent-0520-02.png" alt="logoDentist" /></Navbar.Brand>
          {isMobile ? (
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setShowMenu(true)}/>
          ) : (
            <>
              {!datosUserRedux?.credentials?.token ? (
                <Nav className="me-auto">
                  <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/login")}>Login</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/register")}>Register</Nav.Link>
                </Nav>
              ) : (
                <Nav className="me-auto">
                  {datosUserRedux?.credentials?.user.rol === "Admin" &&
                    <Nav.Link className="link" onClick={() => navigate("/admin")}>Admin</Nav.Link>
                  }
                  <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/profile")}>{datosUserRedux.credentials.user.email}</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/newappointments")}>Nueva cita</Nav.Link>
                  <Nav.Link className="link" onClick={() => navigate("/appointments")}>Citas</Nav.Link>
                  <Nav.Link className="link" onClick={() => logMeOut()}>Logout</Nav.Link>
                </Nav>
              )}
            </>
          )}
        </Container>
      </Navbar>
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} style={{ maxHeight: "90vh" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="me-auto">
            {!datosUserRedux?.credentials?.token ? (
              <>
                <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link className="link" onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link className="link" onClick={() => navigate("/register")}>Register</Nav.Link>
              </>
            ) : (
              <>
                {datosUserRedux?.credentials?.user.rol === "Admin" &&
                  <Nav.Link className="link" onClick={() => navigate("/admin")}>Admin</Nav.Link>
                }
                <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link className="link" onClick={() => navigate("/profile")}>{datosUserRedux.credentials.user.email}</Nav.Link>
                <Nav.Link className="link" onClick={() => navigate("/newappointments")}>Nueva cita</Nav.Link>
                <Nav.Link className="link" onClick={() => navigate("/appointments")}>Citas</Nav.Link>
                <Nav.Link className="link" onClick={() => logMeOut()}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
