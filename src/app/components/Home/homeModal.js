import _ from "lodash";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAudio, setPalabraDB, getImagen } from "../../services/palabras";
import { PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/solid'

const HomeModal = ({ palabra, handleClose, show }) => {
    const [palabranew, setPalabra] = useState("")
    const [significado, setSignificado] = useState("")
    const [traduccion, setTraduccion] = useState("")
    const [imagen, setImagen] = useState(null)
    const [audio, setAudio] = useState(null)
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (palabra !== null) {
            setPalabra(palabra.palabra)
            setSignificado(palabra.significado)
            setTraduccion(palabra.traduccion)
            if (palabra.audio) getAudio(palabra.audio).then((url) => (setAudio(url)))
            if (palabra.imagen) getImagen(palabra.imagen).then((url) => (setImagen(url)))
        }
        else {
            setAudio(null);
            setImagen(null);
            setPalabra('');
            setSignificado('')
            setTraduccion('')
        }
    }, [palabra])

    const play = (playing) => {
        const newAudio = new Audio(audio);
        if (playing) {
            newAudio.play();
        } else {
            newAudio.pause();
        }
    }

    return (<>
        <Modal show={show} onHide={handleClose} size='md' centered>
            <Modal.Header closeButton>
                <Modal.Title>{palabra !== null ? 'Modificar palabra' : 'Agregar Palabra'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="palabra" className="fw-bold">Palabra</label>
                    <input type="text" onChange={(ev) => { setPalabra(ev.target.value) }} value={palabranew} className="form-control" id="palabra" aria-describedby="emailHelp" placeholder="Ingresa la palabra" />
                    <small id="emailHelp" className="form-text text-muted">Palabra para agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Traduccion</label>
                    <input type="text" onChange={(ev) => { setTraduccion(ev.target.value) }} value={traduccion} className="form-control" id="traduccion" aria-describedby="emailHelp" placeholder="Ingresa la traduccion" />
                    <small id="emailHelp" className="form-text text-muted">Traduccion a agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Significado</label>
                    <input type="text" onChange={(ev) => { setSignificado(ev.target.value) }} value={significado} className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el significado" />
                    <small id="emailHelp" className="form-text text-muted">Significado a agregar al diccionario.</small>
                </div>
                {imagen !== null && palabra !== null ? <div className="text-center"> <img src={imagen} className="w-50" /> <button className="btn btn-danger"><TrashIcon className="icons" /></button> </div> : <div className="form-group my-3">
                    <label htmlFor="significado" className="fw-bold">Imagen</label>
                    <input type="file" onChange={(ev) => { setImagen(ev.target.files[0]) }} className="form-control" id="img" />
                    <small id="emailHelp" className="form-text text-muted">Imagen de la escritura de la palabra.</small>
                </div>}
                {audio !== null && palabra !== null ? <div className="my-4 text-center"> <h2>Audio</h2> <button className="btn btn-success" onClick={() => { setPlaying(!playing); play(playing) }}> {!playing ? <PlayIcon className="icons" /> : <PauseIcon className="icons" />} </button> </div> :
                    <div className="form-group my-3">
                        <label htmlFor="significado" className="fw-bold">Audio</label>
                        <input type="file" onChange={(ev) => { setAudio(ev.target.files[0]) }} className="form-control" id="audio" />
                        <small id="emailHelp" className="form-text text-muted">Audio de la palabra.</small>
                    </div>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                    if (palabra === null) setPalabraDB(palabranew, significado, traduccion, imagen, audio)
                    handleClose()
                }}>
                    {palabra !== null ? 'Modificar' : 'Agregar'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default HomeModal 