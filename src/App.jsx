import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logosimpson.png";
import { Button, Container, Spinner } from "react-bootstrap";
import Frase from "./components/Frase";
import { useEffect, useState } from "react";


function App() {
  const [personaje, setPersonaje] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(()=> {
    consultarApi();
  },[]);

  const consultarApi = async () => {

    try{
      setMostrarSpinner(true)
      const respuesta = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const datos = await respuesta.json();
      console.log(respuesta);
      console.log(datos[0]);
      setPersonaje(datos[0]);
      setMostrarSpinner(false)
    }catch (error){

      console.log(error);

    }


  }

  const mostrarComponente = (mostrarSpinner)? (
    <div className="my-5">
    <Spinner animation="border" variant="dark" />
    </div>) : <Frase personaje={personaje}/>

  return (
    <>
      <Container className="text-center my-5">
        <img src={logo} alt="Logo de los simpson" className="w-50" />
        {mostrarComponente}
        <Button variant="warning" onClick={consultarApi}>
          Get phrase
        </Button>
      </Container>
    </>
  );
}

export default App;
