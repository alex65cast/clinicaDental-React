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
import { detail } from "../detailSlice";
import { dispatch } from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { bringMeDentist } from "../../services/apiCalls";
import { Dropdown } from "react-bootstrap";
import { editQuote } from "../../services/apiCalls";

export const Appointments = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [dentistInfo, setDentistInfo] = useState([]);
  
  const [selectedQuote, setSelectedQuote] = useState(null);


  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

  const [credentials, setCredentials] = useState({
    dentist: "",
    quote: selectedQuote ? selectedQuote.quote : "",
    endOfQuote: "",
    dateOfQuote: "",
   });

  const editAppointmentDetail = (quote) => {
    selectedQuote(quote);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      quote: quote.quote,
    }));
    handleShow();
  };
  // useEffect(() => {
  //   console.log(credentials);
  // });

  const inputHandlerFunction = (e) => {
   setCredentials((prevState) => ({
     ...prevState,
     [e.target.name]: e.target.value,
   }));
 };
 const handleEditClick = (quote) => {
  setSelectedQuote(quote);
  handleShow(); // Mostrar el modal de edición de citas
};
  const handlerFunctionDentist = (e,id) => {
    const { name, value } = e.target;
    const newValue = e.type === 'click' ? id : value;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const editQ = () => {
    console.log(selectedQuote, "SELECIONADO");
    if (selectedQuote) {
      editQuote(selectedQuote._id, credentials, quoteRdxData.credentials)
        .then(() => {
          handleClose();
          setSelectedQuote(null); // Restablecer la cita seleccionada a null
          navigate("/appoiments");
        })
        .catch((error) => console.log(error));
    }
  };
  
  useEffect(() => {
    bringMeDentist()
       .then((resultado) => {
         console.log(resultado.data, 'dentistas')
         setDentistInfo(resultado.data)
       })
       .catch((error) => console.log(error))
   }, []);

  useEffect(() => {
    bringQuotesUser(quoteRdxData.credentials)
      .then((results) => {
        setDatosPerfilUser(results.data);
      })
      .catch((error) => console.log(error));
  }, [datosPerfilUser]);

  return (
    // <Container fluid>
      <div className="adminDesing">
        <div className="card-grid">
          {datosPerfilUser.length > 0 ? (
            <>
            {quoteRdxData ? (
                <>
                {datosPerfilUser.map((quote) => {
                return (
            
                      <Card className="text-center" key={quote._id}>
                        <Card.Header className="headCard">
                          Citas del usuario: {quote.customer.name} <br />
                          <Button variant="primary" onClick={() => handleEditClick(quote)}>
                            Editar
                          </Button>
                          
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
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Editar Cita</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                              <div className="containerDesing">
                              <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Tipo de tratamiento</Form.Label>
                                <Form.Control
                                  placeholder="Enter name"
                                  name="quote"
                                  value={credentials.quote}
                                  onChange={inputHandlerFunction}
                                  
                                />
                              </Form.Group>
                                <Dropdown className="d-inline mx" autoClose="inside">
                                  <Dropdown.Toggle id="dropdown-autoclose-inside">
                                    Eliga un dentista 
                                  </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {dentistInfo.map((dentistas) => (
                                  <Dropdown.Item key={dentistas._id} name='dentist' as="button" type="button" onClick={(e)=>handlerFunctionDentist(e,dentistas._id)}>{dentistas.name}</Dropdown.Item>))}  
                                </Dropdown.Menu>
                              </Dropdown><br />
                              <Form.Group className="mb-3" controlId="formBasicStartDate">
                                <Form.Label>Hora de inicio</Form.Label>
                                <Form.Control
                                  type="datetime-local"
                                  name="dateOfQuote"
                                  onChange={inputHandlerFunction}

                                />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicEndDate">
                                <Form.Label>Hora fin</Form.Label>
                                <Form.Control
                                  type="datetime-local"
                                  name="endOfQuote"
                                  onChange={inputHandlerFunction}
                                />
                              </Form.Group>
                              </div>
                          </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" type="button" onClick={() => editQ()}>
                                Editar
                              </Button>
                            </Modal.Footer>
                          </Modal>
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
    // </Container>
  );
};
