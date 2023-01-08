import React from "react";
import "../../styles/home.css";

const Modal = ({children}) => {
    return (
        <div className="modal is-open">
            <div className="modal.container">
                <button className="modal-close">X</button>
                <p>que hay aquí?</p>
                {children}
                {/*
                <h3>{props.titulo}</h3>
                <p>{props.cuerpo}</p>
                <img src={props.img}></img>
                */}
            </div>
        </div>
    )
}


export default Modal;