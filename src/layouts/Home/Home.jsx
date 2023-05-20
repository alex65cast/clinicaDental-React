import React, { useState, useEffect } from "react";
import "./Home.css";

import loading from '../../../public/loading.gif'
import loadingCircle from "../../../public/loadingCircle.gif"
import { bringCharacters } from "../../services/apiCalls";

import { useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom';

export const Home = () => {

  //Instancio RDX en modo escritura

  const dispatch = useDispatch();

  //Instancio navigate

  const navigate = useNavigate();

  const [characters, setCharacters] = useState([]);

  //useEffect para cuando el componente se está montando POR PRIMERA VEZ

  // useEffect(()=>{

  // },[]);

  /*useEffect para cuando el componente se actualiza (se ejecutará SIEMPRE que haya
    algún cambio en algún hook...)*/

  // useEffect(()=>{

  // });

  //Tenemos los useEffect de seguimiento, que se ejecutarán sólo cuando cambie un hook en concreto


  // const selectedCard = (person) => {

  //   //una vez escogido...guardo en RDX

  //   dispatch(addCharacter({data: person}));

  //   navigate("/detail");

  // }


  useEffect(() => {
    if (characters.length === 0) {
        bringCharacters()
          .then((resultado) => {
            if (resultado.data.results.length > 0) {
              setCharacters(resultado.data.results);
            }
          })
          .catch((error) => console.log(error));
    }
  }, [characters]);

  return (
    <div className="homeDesign">
      {characters.length > 0 ? (
        /*aqui mapeare a los personajes porque ya han venido de la API
        y por eso hemos entrado en este condicional*/

        <></>
        // <div className="charactersDesign">
        //   {characters.map((person) => {
        //     return (
        //       <div key={person.id} onClick={() => selectedCard(person)}>
        //         <CharacterCard
        //           name={person.name}
        //           status={person.status}
        //           species={person.species}
        //           gender={person.gender}
        //           image={person.image}
        //         />
        //       </div>
        //     );
        //   })}
        // </div>
      ) : (
        <div>
          <img src={loadingCircle} alt="spinnerLoading"/>
        </div>
      )}
    </div>
  );
};
