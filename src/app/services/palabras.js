import { collection, getDocs, getDoc, doc, setDoc, writeBatch } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import swal from 'sweetalert';

const setPalabraDB = async (palabra, significado, traduccion, imagen, audio, sinonimo, abrev, nahuat, hispa, mex, cambio, mod) => {
    try {
        const newDate = new Date();

        switch (mod) {
            case 0:
                const storageRefImagen = ref(storage, `/imagenes/${newDate.getTime() + '-' + imagen.name}`);
                const storageRefAudio = ref(storage, `/audios/${newDate.getTime() + '-' + audio.name}`);
                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                uploadBytesResumable(storageRefImagen, imagen);
                uploadBytesResumable(storageRefAudio, audio);
                await setDoc(doc(db, 'Palabras', traduccion), {
                    palabra: palabra,
                    traduccion: traduccion,
                    significado: significado,
                    imagen: newDate.getTime() + '-' + imagen.name,
                    audio: newDate.getTime() + '-' + audio.name,
                    sinonimo: sinonimo,
                    abrev: abrev,
                    nahuat: nahuat,
                    hispa: hispa,
                    mex: mex,
                    cambio: cambio,
                    estado: 'Activo',
                })
                break;
            case 1:
                await setDoc(doc(db, 'Palabras', traduccion), {
                    palabra: palabra,
                    traduccion: traduccion,
                    significado: significado,
                    imagen: imagen.name,
                    audio: audio.name,
                    sinonimo: sinonimo,
                    abrev: abrev,
                    nahuat: nahuat,
                    hispa: hispa,
                    mex: mex,
                    cambio: cambio,
                    estado: 'Activo',
                })
                break;

            case 3:
                const storageRefImagenMod = ref(storage, `/imagenes/${newDate.getTime() + '-' + imagen.name}`);
                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                uploadBytesResumable(storageRefImagenMod, imagen);
                await setDoc(doc(db, 'Palabras', traduccion), {
                    palabra: palabra,
                    traduccion: traduccion,
                    significado: significado,
                    imagen: newDate.getTime() + '-' + imagen.name,
                    audio: audio.name,
                    sinonimo: sinonimo,
                    abrev: abrev,
                    nahuat: nahuat,
                    hispa: hispa,
                    mex: mex,
                    cambio: cambio,
                    estado: 'Activo',
                })
                break;

            case 4:
                const storageRefAudioMod = ref(storage, `/audios/${newDate.getTime() + '-' + audio.name}`);
                uploadBytesResumable(storageRefAudioMod, audio);
                await setDoc(doc(db, 'Palabras', traduccion), {
                    palabra: palabra,
                    traduccion: traduccion,
                    significado: significado,
                    imagen: imagen.name,
                    audio: newDate.getTime() + '-' + audio.name,
                    sinonimo: sinonimo,
                    abrev: abrev,
                    nahuat: nahuat,
                    hispa: hispa,
                    mex: mex,
                    cambio: cambio,
                    estado: 'Activo',
                })
                break;

            case 5:
                const storageRefImagenMod2 = ref(storage, `/imagenes/${newDate.getTime() + '-' + imagen.name}`);
                const storageRefAudioMod2 = ref(storage, `/audios/${newDate.getTime() + '-' + audio.name}`);
                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                uploadBytesResumable(storageRefImagenMod2, imagen);
                uploadBytesResumable(storageRefAudioMod2, audio);
                await setDoc(doc(db, 'Palabras', traduccion), {
                    palabra: palabra,
                    traduccion: traduccion,
                    significado: significado,
                    imagen: newDate.getTime() + '-' + imagen.name,
                    audio: newDate.getTime() + '-' + audio.name,
                    sinonimo: sinonimo,
                    abrev: abrev,
                    nahuat: nahuat,
                    hispa: hispa,
                    mex: mex,
                    cambio: cambio,
                    estado: 'Activo',
                })
                break;
        }

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getPalabras = async () => {
    let dataPalabras = []
    const palabras = await getDocs(collection(db, 'Palabras'));
    palabras.forEach((doc) => {
        dataPalabras.push(doc.data())
    });
    return dataPalabras
}


const getAudio = async (audio) => {
    try {
        return await getDownloadURL(ref(storage, `/audios/${audio}`)).then((url) => url)
    }
    catch (e) {
        console.error("Error in get Audio: ", e);
    }
}

const getImagen = async (imagen) => {
    try {
        return await getDownloadURL(ref(storage, `/imagenes/${imagen}`)).then((url) => url)
    }
    catch (e) {
        console.error("Error in get Image: ", e);
    }
}

const deletePalabraDB = (palabra, mod) => {
    try {
        if (mod === 1) {
            swal({ title: 'Estas seguro de inhabilitar la palabra', icon: 'warning', buttons: ["Cancelar", 'Aceptar'], closeOnClickOutside: false, closeOnEsc: false })
                .then((value) => {
                    if (value) {
                        const batch = writeBatch(db)
                        batch.update(doc(db, 'Palabras/' + palabra.traduccion), {
                            estado: 'Inactivo',
                        })
                        swal({ title: 'Palabra inhabilitada correctamente', icon: 'success' })
                        batch.commit();
                    }
                });
        } else {
            swal({ title: 'Estas seguro de habilitar la palabra', icon: 'warning', buttons: ["Cancelar", 'Aceptar'], closeOnClickOutside: false, closeOnEsc: false })
                .then((value) => {
                    if (value) {
                        const batch = writeBatch(db)
                        batch.update(doc(db, 'Palabras/' + palabra.traduccion), {
                            estado: 'Activo',
                        })
                        swal({ title: 'Palabra habilitada correctamente', icon: 'success' })
                        batch.commit();
                    }
                });
        }

    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export {
    setPalabraDB,
    getPalabras,
    getAudio,
    getImagen,
    deletePalabraDB
}