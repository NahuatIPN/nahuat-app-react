import "./styles_navbar.css";
import { signOut } from '@firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../services/firebase';

export default function Navbar(){
    const signOutUser = async() =>{
        try{
          await signOut(auth).then(()=>{
            console.error("Se cerró sesion");
          })
        }catch(error){
          console.log(error)
        }
      }
    return <nav className="nav">
        <p className="site-title px-5 pt-2">Nahuatl admin</p>
        <ul>
            <li>
            <button className="btn btn-primary" onClick={()=>signOutUser()}> Cerrar session</button>
            </li>
        </ul>
    </nav>
}