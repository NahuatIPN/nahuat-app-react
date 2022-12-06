import _ from "lodash";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAudio, setPalabraDB, getImagen, deletePalabraDB } from "../../services/palabras";
import { PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/solid'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Select from 'react-select';

const HomeModal = ({ palabra, data, handleClose, show }) => {
    const [palabranew, setPalabra] = useState("")
    const [significado, setSignificado] = useState("")
    const [traduccion, setTraduccion] = useState("")
    const [imagen, setImagen] = useState(null)
    const [audio, setAudio] = useState(null)
    const [imagenURL, setImagenURL] = useState(null)
    const [audioURL, setAudioURL] = useState(null)
    const [sinonimo, setSinonimo] = useState([])
    const [playing, setPlaying] = useState(false);
    const [newOptions, setNewOptions] = useState([]);
    const [abrev, setAbrev] = useState('');
    const [nahuat, setNahuat] = useState('');
    const [hispa, setHispa] = useState('');
    const [cambio, setCambio] = useState('');
    const [mex, setMex] = useState('');
    const [mod, setMod] = useState(0);

    useEffect(()=>{
        if(palabra !== null){
            setPalabra(palabra.palabra)
            setSignificado(palabra.significado)
            setTraduccion(palabra.traduccion)
            setSinonimo(palabra.sinonimo)
            setAbrev(palabra.abrev)
            setNahuat(palabra.nahuat)
            setHispa(palabra.hispa)
            setCambio(palabra.cambio)
            setMex(palabra.mex)
            let arr = []
            const filterData = _.filter(data, (i)=> i.palabra !== palabra.palabra)
            _.map(filterData, (i) => {
                arr.push({ value: i.palabra, label: i.palabra })
            })
            setNewOptions(arr)
            setMod(1)
            if (palabra.audio){
                getAudio(palabra.audio).then((url) => {setAudioURL(url); setAudio(palabra.audio)})
            }else{ 
                setAudioURL(null); setAudio(null) 
            }
            if (palabra.imagen) {getImagen(palabra.imagen).then((url) => {setImagenURL(url); setImagen(palabra.imagen);})} 
            else{setImagenURL(null); setImagen(null);}
        }
        else {
            setAudio(null);
            setImagen(null);
            setPalabra('');
            setSignificado('')
            setTraduccion('')
            setAbrev('')
            setSinonimo([])
            setNahuat('')
            setMex('')
            setHispa('')
            setCambio('')
            let arr = []
            setMod(0)
            _.map(data, (i) => {
                arr.push({ value: i.palabra, label: i.palabra })
            })
            setNewOptions(arr)
            console.log(data)
        }
    }, [palabra, data])

    const play = (playing) => {
        const newAudio = new Audio(audioURL);
        if (playing) {
            newAudio.play();
        } else {
            newAudio.pause();
        }
    }

    const validatorOnlyletter = (e) => {
        const re = /^[A-Z\s]+$/i;
        if (re.test(e)) {
            return true
        }
        return false
    }

    return (<>
        <Modal show={show} onHide={handleClose} size='md' centered>
            <Modal.Header closeButton>
                <Modal.Title>{palabra !== null ? 'Modificar palabra' : 'Agregar Palabra'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Palabra Español</label>
                    
                        <input type="text"  onChange={(ev) => { if(validatorOnlyletter(ev.target.value)) setTraduccion(ev.target.value) }} value={traduccion} className="form-control" id="traduccion" aria-describedby="emailHelp" placeholder="Ingresa la traduccion" /> 

                    
                    <small id="emailHelp" className="form-text text-muted">Palabra en Español a agregar al diccionario.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="palabra" className="fw-bold">Palabra Nahuat</label>
                    <input type="text" onChange={(ev) => { if(validatorOnlyletter(ev.target.value)) setPalabra(ev.target.value) }} value={palabranew} className="form-control" id="palabra" aria-describedby="emailHelp" placeholder="Ingresa la palabra" />
                    <small id="emailHelp" className="form-text text-muted">Palabra para agregar en Nahuat al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Significado o Cosmovision</label>
                    <input type="text" onChange={(ev) => { if(validatorOnlyletter(ev.target.value)) setSignificado(ev.target.value) }} value={significado} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el significado" />
                    <small id="emailHelp" className="form-text text-muted">Cosmovision Nahuat al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Abrev - Clasificacion Gramatical</label>
                    <input type="text" onChange={(ev) => {if(validatorOnlyletter(ev.target.value)) setAbrev(ev.target.value) }} value={abrev} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa la abrev" />
                    <small id="emailHelp" className="form-text text-muted">Abrev a agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Nahuatlismo</label>
                    <input type="text" onChange={(ev) => {if(validatorOnlyletter(ev.target.value)) setNahuat(ev.target.value) }} value={nahuat} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el Nahuatlismo o Hispanismo" />
                    <small id="emailHelp" className="form-text text-muted">Nahuatlismo o Hispanismo agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Hispanismo</label>
                    <input type="text" onChange={(ev) => {if(validatorOnlyletter(ev.target.value)) setHispa(ev.target.value) }} value={hispa} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el Nahuatlismo o Hispanismo" />
                    <small id="emailHelp" className="form-text text-muted">Nahuatlismo o Hispanismo agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Cambio Linguistico</label>
                    <input type="text" onChange={(ev) => {if(validatorOnlyletter(ev.target.value)) setCambio(ev.target.value) }} value={cambio} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el Nahuatlismo o Hispanismo" />
                    <small id="emailHelp" className="form-text text-muted">Nahuatlismo o Hispanismo agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Mexicanismo</label>
                    <input type="text" onChange={(ev) => {if(validatorOnlyletter(ev.target.value)) setMex(ev.target.value) }} value={mex} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el Nahuatlismo o Hispanismo" />
                    <small id="emailHelp" className="form-text text-muted">Nahuatlismo o Hispanismo agregar al diccionario.</small>
                </div>
                {imagenURL !== null && palabra !== null ? <div className="text-center"> <img src={imagenURL} className="w-50" /> <button className="btn btn-danger" onClick={()=>{setImagen(null); setImagenURL(null); mod === 4 ? setMod(5) : setMod(3)}}><TrashIcon className="icons" /></button> </div> : <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Imagen</label>
                    <input type="file" onChange={(ev) => { setImagen(ev.target.files[0]); mod === 4 ? setMod(5) : setMod(3) }} className="form-control" id="img" />
                    <small id="emailHelp" className="form-text text-muted">Imagen representativa de la palabra.</small>
                </div>}
                {audio !== null && palabra !== null ? <div className="my-4 text-center"> <h2>Audio</h2> 
                <button className="btn btn-success" onClick={() => { setPlaying(!playing); play(playing) }}> {!playing ? <PlayIcon className="icons" /> : <PauseIcon className="icons" />} </button>
                <button className="btn btn-danger" onClick={()=>{setAudio(null); mod === 3 ? setMod(5) : setMod(4) }}><TrashIcon className="icons" /></button> </div> :
                    <div className="form-group my-3">
                        <label htmlFor="significado" className="fw-bold">Audio</label>
                        <input type="file" onChange={(ev) => { setAudio(ev.target.files[0]); mod === 3 ? setMod(5) : setMod(4) }} className="form-control" id="audio" />
                        <small id="emailHelp" className="form-text text-muted">Audio de la palabra.</small>
                    </div>}

                {
                    <div className="form-group my-3">
                        <label htmlFor="significado" className="fw-bold">Sinonimos</label>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            value={sinonimo}
                            options={newOptions}
                            onChange={(ev)=> setSinonimo(ev)}
                        />
                        <small id="emailHelp" className="form-text text-muted">Aqui puede vincular los sinonimos con la palabras.</small>
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
            {palabra ? palabra.estado === 'Activo' ? <EyeIcon onClick={()=>{deletePalabraDB(palabra , 1); handleClose()}} className="icons text-success" /> : <EyeOffIcon onClick={()=>{deletePalabraDB(palabra , 0); handleClose() }} className="icons text-danger" /> : '' }
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                    setPalabraDB(palabranew, significado, traduccion, imagen, audio, sinonimo, abrev, nahuat, hispa, mex, cambio, mod)
                    handleClose()
                    
                }}>
                    {palabra !== null ? 'Modificar' : 'Agregar'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default HomeModal 