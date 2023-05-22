import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewAppointment.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/apiCalls";
import { userData } from "../userSlice";
import Container from "react-bootstrap/Container";
import { bringMeDentist } from "../../services/apiCalls";
import Dropdown from 'react-bootstrap/Dropdown';
import { createNewQoute } from "../../services/apiCalls";

export const NewAppointment = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const [dentistInfo, setDentistInfo] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);

  const [credentials, setCredentials] = useState({
    dentist: "",
    quote: "",
    endOfQuote: "",
    dateOfQuote: "",
  });

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerFunctionDentist = (e, dentistId) => {
    e.preventDefault();

    // Obtener el objeto dentista seleccionado según el ID
    const selected = dentistInfo.find((dentista) => dentista._id === dentistId);

    // Almacenar el dentista seleccionado en el estado
    setSelectedDentist(selected);

    setCredentials((prevState) => ({
      ...prevState,
      dentist: dentistId,
    }));
  };

  useEffect(() => {
    bringMeDentist()
       .then((resultado) => {
         console.log(resultado.data, 'dentistas');
         setDentistInfo(resultado.data);
       })
       .catch((error) => console.log(error));
  }, []);

  const registerQuote = () => {
    createNewQoute(credentials, userRdxData.credentials)
    .then(() => {
      navigate("/appointments");
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="newAppointmentDesign">
      <Container fluid>
        <div className="registerDesign">
          <Form>
            <div className="containerDesing">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tipo de tratamiento</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  name="quote"
                  onChange={inputHandlerFunction}
                />
              </Form.Group>
              <Dropdown className="d-inline mx" autoClose="inside">
                <Dropdown.Toggle id="dropdown-autoclose-inside">
                  {selectedDentist ? selectedDentist.name : 'Eliga un dentista'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dentistInfo.map((dentistas) => (
                    <Dropdown.Item
                      key={dentistas._id}
                      name='dentist'
                      as="button"
                      type="button"
                      onClick={(e) => handlerFunctionDentist(e, dentistas._id)}
                    >
                      {dentistas.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <br />
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
              <Button variant="primary" type="button" onClick={() => registerQuote()}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};
