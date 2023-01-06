import React from "react";
import Modal from "./modal.js";

const Modals = () => {
    return (
        <div>
            <h2>Modales</h2>
            <button>Modal 1</button>
            <Modal titulo="Titulo Modal 1" cuerpo="Cuerpo Modal 1" img="https://placeimg.com/400/400/animals">
                <h3>Modal 1</h3>
                <p>Hola este es el contenido de mi modal 1</p>
                <img src="https://placeimg.com/400/400/animals"></img>
            </Modal>
        </div>
    )
}


export default Modals;