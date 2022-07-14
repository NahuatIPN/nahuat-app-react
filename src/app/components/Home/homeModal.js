import _ from "lodash";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const HomeModal = ({ palabra, handleClose, show }) => {

    return (<>
        <Modal show={show} onHide={handleClose} size='md' centered>
            <Modal.Header closeButton>
                <Modal.Title>{palabra !== null ? 'Modificar palabra' : 'Agregar Palabra'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label for="palabra" className="fw-bold">Palabra</label>
                    <input type="text" className="form-control" id="palabra" aria-describedby="emailHelp" placeholder="Ingresa la palabra" />
                        <small id="emailHelp" className="form-text text-muted">Palabra para agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label for="significado" className="fw-bold">Traduccion</label>
                    <input type="text" className="form-control" id="traduccion" aria-describedby="emailHelp" placeholder="Ingresa la traduccion" />
                        <small id="emailHelp" className="form-text text-muted">Traduccion a agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label for="significado" className="fw-bold">Significado</label>
                    <input type="text" className="form-control" id="significado" aria-describedby="emailHelp" placeholder="Ingresa el significado" />
                        <small id="emailHelp" className="form-text text-muted">Significado a agregar al diccionario.</small>
                </div>
                <div className="form-group my-3">
                    <label for="significado" className="fw-bold">Imagen</label>
                    <input type="file" className="form-control" id="img" />
                        <small id="emailHelp" className="form-text text-muted">Imagen de la escritura de la palabra.</small>
                </div>
                <div className="form-group my-3">
                    <label for="significado" className="fw-bold">Audio</label>
                    <input type="file" className="form-control" id="audio" />
                        <small id="emailHelp" className="form-text text-muted">Audio de la palabra.</small>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default HomeModal 