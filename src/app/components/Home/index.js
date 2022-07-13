import _ from "lodash";
import { signOut } from '@firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../services/firebase';
import Navbar from "../navbar/navbar";
import logo from '../imgs/Logo.png';


const Home = () =>{

    return(<>
      <Navbar/>
      <br></br>
      <br></br>
      <div align="center"><img src={logo} alt="Logo" width="500" height="500" /></div>
    </>)
}

export default Home 