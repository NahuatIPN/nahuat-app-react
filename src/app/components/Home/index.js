import _ from "lodash";
import { signOut } from '@firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../services/firebase';


const Home = () =>{
    const signOutUser = async() =>{
        try{
          await signOut(auth).then(()=>{
            console.error("Se cerro sesion");
          })
        }catch(error){
          console.log(error)
        }
      }
    return(<>
       <button className="btn btn-primary" onClick={()=>signOutUser()}>
        Cerrar session
       </button>
    </>)
}

export default Home 