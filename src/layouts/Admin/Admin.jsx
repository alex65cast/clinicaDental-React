import React from "react";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";

import { useNavigate } from "react-router-dom";
import loadingCircle from "../../../public/loadingCircle.gif";
import { bringUsersAdmin } from "../../services/apiCalls.js";
import Bun from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";

import "./Admin.css";
export const Admin = () => {
  const [datosPerfilUser, setDatosPerfilUser] = useState([]);

  useEffect(() => {
    console.log(datosPerfilUser, "DATOS PERFIL");
  }, []);

  //Instancio conexion a RDX en modo lectura

  const userRdxData = useSelector(userData);

  useEffect(() => {
    console.log(userRdxData.credentials, "HOALALAA");
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userRdxData.credentials.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    bringUsersAdmin(userRdxData.credentials)
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
            {datosPerfilUser.map((person) => {
              return (
                <Card className="text-center" key={person.id}>
                  <Card.Header>Perfil de Usuario</Card.Header>
                  <Card.Body>
                    <Card.Text>Nombre: {person.name}</Card.Text>
                    <Card.Text>Correo: {person.email}</Card.Text>
                    <Card.Text>
                      Fecha de creación: {person.date}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    {person.rol}
                  </Card.Footer>
                </Card>
              );
            })}
          </>
        ) : (
            
          <div>
            <img src={loadingCircle} alt="spinnerLoading" />
          </div>
        )}
        </div>
      </div>
    // </Container>
  );
};
