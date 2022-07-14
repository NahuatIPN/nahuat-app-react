import _ from "lodash";
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../navbar/navbar";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


const Home = () => {

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
              <td><PencilAltIcon className="icons"/> <TrashIcon className="icons text-danger" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>)
}

export default Home 