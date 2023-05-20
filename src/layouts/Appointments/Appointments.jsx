import React from "react";
import "./Appointments.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringQuotesUser } from "../../services/apiCalls";
import { Container } from "react-bootstrap";
import loadingCircle from "../../../public/loadingCircle.gif";
import { Card } from "react-bootstrap";

export const Appointments = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);

  useEffect(() => {
    console.log(datosPerfilUser, "DATOS PERFIL");
  }, []);

  //Instancio conexion a RDX en modo lectura

  const quoteRdxData = useSelector(userData);

  useEffect(() => {
    console.log(quoteRdxData.credentials, "HOALALAA");
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quoteRdxData.credentials.token) {
      navigate("/");
    }
  }, []);


  useEffect(() => {
    bringQuotesUser(quoteRdxData.credentials)
      .then((results) => {
        setDatosPerfilUser(results.data);
      })
      .catch((error) => console.log(error));
  }, [datosPerfilUser]);

  return (
    <Container fluid>
      <div className="quoteDesing">
        <div className="cardGrid">
          {datosPerfilUser.length > 0 ? (
            <>
            {quoteRdxData.credentials.user.rol == "Cliente" || quoteRdxData.credentials.user.rol == "Dentista" ||  quoteRdxData.credentials.user.rol == "Admin" ? (
                <>
                {datosPerfilUser.map((quote) => {
                return (
            
                      <Card className="text-center" key={quote._id}>
                        <Card.Header className="headCard">
                          Citas del usuario: {quote.customer.name}
                        </Card.Header>
                        <Card.Body>
                        <Card.Text>
                            Doctor asociado: {quote.dentist.name}
                          </Card.Text>
                          <Card.Text>
                            Tipo de tratamiento: {quote.quote}
                          </Card.Text>
                          <Card.Text>
                            Fecha del tratamiento: {quote.dateOfQuote}
                          </Card.Text>
                          <Card.Text>
                            Finalización estimada: {quote.endOfQuote}
                          </Card.Text>
                        </Card.Body>
                        {quote.activeQuote == true ? (
                          <Card.Footer className="text-muted activate">
                            Activa
                          </Card.Footer>
                        ) : (
                          <Card.Footer className="text-muted">
                            Caducada
                          </Card.Footer>
                        )}
                      </Card>
            
                );
              })} </>):(<div className="quoteDesing">No tienes</div>)}
              
            </>
          ) : (
            <div className="quoteDesing">
              <img src={loadingCircle} alt="spinnerLoading" />
              <div className="quoteDesing">No tienes</div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
