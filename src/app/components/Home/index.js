import _ from "lodash";
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../navbar/navbar";
import { PencilAltIcon} from '@heroicons/react/solid'
import HomeModal from "./homeModal";
import { deletePalabraDB, getPalabras } from "../../services/palabras";


const Home = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [palabra, setPalabra] = useState(null);
  const [data, setData] = useState(null);

  useEffect(()=>{
    async function getData (){
      const palabras = await getPalabras()
      setData(palabras)
    }
    getData()
}, [show]);

  return (<>
    <Navbar />
    <div className="container my-5">
      <div className="my-5">
        <button className="btn btn-success" onClick={()=>{handleShow(); setPalabra(null)}}>Agregar palabra</button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Palabra</th>
              <th scope="col">Traduccion</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {_.map(data, (palabra, index)=>{
              return ( <tr key={index}>
               <th scope="row">{index + 1}</th>
               <td>{palabra.palabra}</td>
               <td>{palabra.traduccion}</td>
               <td><PencilAltIcon className="icons" onClick={()=>{handleShow(); setPalabra(palabra)}}/> </td>
             </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>

    <HomeModal palabra={palabra} data={data} handleClose={handleClose} show={show}/>
  </>)
}

export default Home 