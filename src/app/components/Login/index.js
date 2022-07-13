import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from "react-router";
import swal from 'sweetalert';
import { AuthContext } from '../../services/Auth';
import { auth } from '../../services/firebase';
import "../styles/styles.css";
import logo from '../imgs/Logo.png';


const Login = ({ history }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const Enviar = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                swal({ title: 'Bienvenido', icon: 'success', button: 'Aceptar', closeOnClickOutside: false, closeOnEsc: false })
                    .then(() => { history.push("/home") });
            })
        }
        catch (error) {
            swal('Contraseña o Usuario incorrecto', 'error', 'Algo salio mal')
        }
    }

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            history.push("/home")
        }
    }, [history, currentUser])

    return (<>
        <div className="w-full flex flex-wrap">

            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <span className="bg-black text-white font-bold text-xl p-4"> Nahuat App</span>
                </div>

                <div className="app">
                    <p className="title">Bienvenido.</p>
                    <img src={logo} alt="Logo" width="200" height="200" />
                    <form className="login-form">
                        <div className="input-container">
                            <label className="text-lg">Correo</label>
                            <input onChange={(ev) => { setUser(ev.target.value) }} type="email" id="email" placeholder="tucorreo@ufg.edu.sv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>

                        <div className="input-container">
                            <label className="text-lg">Contraseña</label>
                            <input type="password" onChange={(ev) => { setPass(ev.target.value) }} id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </form>
                    <div className= '' >
                        <button onClick={() => { Enviar({ email: user, password: pass }) }} className="button-container" > Ingresar</button>
                    </div>
                    <div className="text-center pt-12 pb-12">
                    </div>
                </div>

            </div>
        </div>

    </>)
}


export default withRouter(Login) 