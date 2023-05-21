import React from "react";
import "./Home.css";

import loading from "../../../public/loading.gif";
import loadingCircle from "../../../public/loadingCircle.gif";
import { bringCharacters } from "../../services/apiCalls";

import { useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";
import firstSlide from "../../../public/equipo-medico-clinica-dental.jpg";
import secondtSlide from "../../../public/clinica2.jpg";
import thirdtSlide from "../../../public/clinica3.jpg";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const Home = () => {
  return (
    <div className="homeDesign">
      <div className="carrouselDesing">
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={firstSlide} alt="First slide" />
            <Carousel.Caption>
              <h3 className="texto-con-borde">Un equipo de primera</h3>
              <p className="texto-con-borde">
                Con más de 20 dentistas especializados.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={thirdtSlide}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="texto-con-borde"></h3>
              <p className="texto-con-borde">
              ¡Ven a visitarnos y descubre por qué somos
          la elección preferida de nuestros pacientes!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Navbar bg="dark" variant="dark" className="">
          <Container>
            <Navbar.Brand href="#home">Sobre nosotros <br />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="center">
          {" "}
          Somos una clínica dental comprometida con tu salud bucal y tu sonrisa
          radiante. Nuestro equipo de expertos odontólogos está dedicado a
          brindarte la mejor atención y los tratamientos dentales más avanzados. <br />
          En nuestra clínica, nos enorgullece ofrecer una amplia gama de
          servicios dentales, incluyendo limpiezas, blanqueamiento dental,
          ortodoncia, implantes dentales, y mucho más. <br /> 
        </div>
        <br /><br />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.0878155412356!2d-3.6974286249611144!3d40.406905356238795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42262f21eef7ab%3A0x9c7ab2f23785ddd4!2sRda.%20de%20Atocha%2C%207%2C%2028012%20Madrid!5e0!3m2!1ses!2ses!4v1684687710560!5m2!1ses!2ses"
          width="300"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" className="centerMap"
        ></iframe>
        <br />
        <Navbar bg="dark" variant="dark" className="">
          <Container>
            <Navbar.Brand href="#home">Alejandro Castejón 2023<br />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
