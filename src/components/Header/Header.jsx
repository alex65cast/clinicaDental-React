import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

//Conexion a RDX en modo lectura
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

export const Header = () => {
  //Instancio la conexion a RDX en modo lectura....
  const datosUserRedux = useSelector(userData);

  //Instancio la conexion a RDX en modo escritura....

  const dispatch = useDispatch();

  useEffect(()=>{
      console.log(datosUserRedux, "tioooooooooooo")
  },[])

  //Instancio useNavigate para poder navegar..

  const navigate = useNavigate();

  //Funcion de logout

  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));

    setTimeout(()=>{
      navigate("/login");
    },500)
  }

  return (
    
    <Navbar className="headerDesign"  bg="primary" variant="dark" >
      <Container>
      <Navbar.Brand className="link"><img src="https://ofallondentalworks.com/wp-content/uploads/2020/05/ODW-Cosmetic-Dent-0520-02.png" alt="logoDentist"></img></Navbar.Brand>
      {!datosUserRedux?.credentials?.token ? (
        <>
      
          <Nav className="me-auto" >
            <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/register")}>Register</Nav.Link>
          </Nav>

        </>
      ) : (
        <>
          {datosUserRedux?.credentials?.user.rol === "Admin" &&
          
            <Nav.Link className="link" onClick={() => navigate("/admin")}>Admin</Nav.Link>
          }
          <Nav className="me-auto">
            <Nav.Link className="link" onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/profile")}>{datosUserRedux.credentials.user.email}</Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/newappointments")}>Nueva cita</Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/appointments")}>Citas</Nav.Link>
            <Nav.Link className="link" onClick={() => logMeOut()}>Logout</Nav.Link>
          </Nav>
        </>
      )}
      </Container>
    </Navbar>
    // {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
    //   <Navbar key={expand} bg="light" expand={expand} className="mb-3">
    //     <Container fluid>
    //       <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
    //       <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
    //       <Navbar.Offcanvas
    //         id={`offcanvasNavbar-expand-${expand}`}
    //         aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    //         placement="end"
    //       >
    //         <Offcanvas.Header closeButton>
    //           <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
    //             Offcanvas
    //           </Offcanvas.Title>
    //         </Offcanvas.Header>
    //         <Offcanvas.Body>
    //           <Nav className="justify-content-end flex-grow-1 pe-3">
    //             <Nav.Link href="#action1">Home</Nav.Link>
    //             <Nav.Link href="#action2">Link</Nav.Link>
    //             <NavDropdown
    //               title="Dropdown"
    //               id={`offcanvasNavbarDropdown-expand-${expand}`}
    //             >
    //               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
    //               <NavDropdown.Item href="#action4">
    //                 Another action
    //               </NavDropdown.Item>
    //               <NavDropdown.Divider />
    //               <NavDropdown.Item href="#action5">
    //                 Something else here
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           </Nav>
    //           <Form className="d-flex">
    //             <Form.Control
    //               type="search"
    //               placeholder="Search"
    //               className="me-2"
    //               aria-label="Search"
    //             />
    //             <Button variant="outline-success">Search</Button>
    //           </Form>
    //         </Offcanvas.Body>
    //       </Navbar.Offcanvas>
    //     </Container>
    //   </Navbar>
    // ))}
  
  );
};
