import "./styles_navbar.css";
import { signOut } from '@firebase/auth';
import React from 'react';
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
        <p className="site-title px-5 pt-2">Nahuat admin</p>
        <ul>
            <li>
            <button className="btn btn-primary" onClick={()=>signOutUser()}> Cerrar sesión</button>
            </li>
        </ul>
    </nav>
}