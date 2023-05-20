import React, { useState, useEffect } from "react";
import "./Login.css";
import { InputText } from "../../components/InputText/InputText";
import { loginMeAgain } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

//Conexion a redux en modo escritura......
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Login = () => {
  //Instanciamos RDX en modo escritura

  const dispatch = useDispatch();

  //Instanciamos RDX en modo lectura

  const userRdxData = useSelector(userData);

  //Instanciamos Navigate

  const navigate = useNavigate();

  //Hook
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
    console.log(credentials,"jpapapap");
  })
  useEffect(()=>{
    if(userRdxData.credentials.token){
      navigate("/")
    };
  },[]);

  const logMeFunction = () => {
    loginMeAgain(credentials)
      .then((resultado) => {
        
        const decoded = jwt_decode(resultado.data.token);

        const datos = {
            token: resultado.data.token,
            user: decoded
        }
        //Una vez tengo el token, lo guardo con el dispatch
        dispatch(login({ credentials: datos }));

        setMessage(`Bienvenido de nuevo ${decoded.email}`);
        //Nos vamos de aqui....

        setTimeout(() => {
          navigate("/");
        }, 2750);

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="loginDesign">
      {message != "" ? (
        <div>{message}</div>
      ) : (
        <div>
    
    <Container fluid>
      <div className="registerDesign">
        <Form>
          <div className="containerDesing">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={inputHandlerFunction}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={inputHandlerFunction}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => logMeFunction()}>
            Login
          </Button>
          </div>
        </Form>
      </div>
    </Container>
        </div>
      )}
    </div>
  );
};
