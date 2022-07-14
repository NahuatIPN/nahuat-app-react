import _ from "lodash";
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../navbar/navbar";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import HomeModal from "./homeModal";


const Home = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (<>
    <Navbar />
    <div className="container my-5">
      <div className="my-5">
        <button className="btn btn-success">Agregar palabra</button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Palabra</th>
              <th scope="col">Significado</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td><PencilAltIcon className="icons" onClick={()=>handleShow()}/> <TrashIcon className="icons text-danger" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <HomeModal palabra={null} handleClose={handleClose} show={show}/>
  </>)
}

export default Home 