import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from "react-router";
import swal from 'sweetalert';
import { AuthContext } from '../../services/Auth';
import { auth } from '../../services/firebase';


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

                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">Bienvenido.</p>
                    <form className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <label className="text-lg">Correo</label>
                            <input onChange={(ev) => { setUser(ev.target.value) }} type="email" id="email" placeholder="tucorreo@ufg.edu.sv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>

                        <div className="flex flex-col pt-4">
                            <label className="text-lg">Contraseña</label>
                            <input type="password" onChange={(ev) => { setPass(ev.target.value) }} id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </form>
                    <button onClick={() => { Enviar({ email: user, password: pass }) }} className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" > Ingresar</button>
                    <div className="text-center pt-12 pb-12">
                    </div>
                </div>

            </div>
        </div>

    </>)
}


export default withRouter(Login) 