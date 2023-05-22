import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringQuotesUser, bringMeDentist, editQuote } from "../../services/apiCalls";
import { Container, Card, Button, Modal, Form, Dropdown } from "react-bootstrap";
import loadingCircle from "../../../public/loadingCircle.gif";
import { useNavigate } from "react-router-dom";

export const Appointments = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);
  const [dentistInfo, setDentistInfo] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [credentials, setCredentials] = useState({
    dentist: "",
    quote: selectedQuote ? selectedQuote.quote : "",
    endOfQuote: "",
    dateOfQuote: "",
  });

  const quoteRdxData = useSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quoteRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditClick = (quote) => {
    setSelectedQuote(quote);
    handleShow();
  };

  const handlerFunctionDentist = (e, id) => {
    const { name, value } = e.target;
    const newValue = e.type === "click" ? id : value;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const editQ = () => {
    if (selectedQuote) {
      editQuote(selectedQuote._id, credentials, quoteRdxData.credentials)
        .then(() => {
          handleClose();
          setSelectedQuote(null);
          navigate("/appointments");
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    bringMeDentist()
      .then((resultado) => {
        setDentistInfo(resultado.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    bringQuotesUser(quoteRdxData.credentials)
      .then((results) => {
        setDatosPerfilUser(results.data);
      })
      .catch((error) => console.log(error));
  }, [datosPerfilUser]);

  return (
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
                        <Button
                          variant="primary"
                          onClick={() => handleEditClick(quote)}
                        >
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
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicName"
                              >
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
                                  {credentials.dentist
                                    ? dentistInfo.find((dentista) => dentista._id === credentials.dentist)
                                        .name
                                    : "Elige un dentista"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {dentistInfo.map((dentista) => (
                                    <Dropdown.Item
                                      key={dentista._id}
                                      name="dentist"
                                      as="button"
                                      type="button"
                                      onClick={(e) =>
                                        handlerFunctionDentist(e, dentista._id)
                                      }
                                    >
                                      {dentista.name}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                              <br />
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicStartDate"
                              >
                                <Form.Label>Hora de inicio</Form.Label>
                                <Form.Control
                                  type="datetime-local"
                                  name="dateOfQuote"
                                  onChange={inputHandlerFunction}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEndDate"
                              >
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
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => editQ()}
                          >
                            Editar
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {quote.activeQuote ? (
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
                })}
              </>
            ) : (
              <div className="quoteDesing">No tienes</div>
            )}
          </>
        ) : (
          <div className="quoteDesing">
            <img src={loadingCircle} alt="spinnerLoading" />
            <div className="quoteDesing">No tienes</div>
          </div>
        )}
      </div>
    </div>
  );
};
