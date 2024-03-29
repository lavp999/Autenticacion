import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link , useNavigate } from "react-router-dom";
import { MI_RUTA } from "../../js/utils"

export const Login = () => {
	const [formData, setFormData] = useState({});
	const [mensaje, setMensaje] = useState({});
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}
	const hacerLogin = (evento) => { 
		const mi_ruta = (process.env.BACKEND_URL ? process.env.BACKEND_URL : MI_RUTA);
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		const data = {"user": formData["user"], "pwd": formData["pwd"]} 

		fetch(mi_ruta + "/api/login", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(data),
			  }) 
		.then(response => response.json())
		.then((response)=>{	if(response["token"]){
								localStorage.setItem("token", response["token"]);
								localStorage.setItem("id_user", response["user_id"]);
								actions.setUserDatos(response["user"], response["nombre"], response["is_Active"]);
								handleClose();
								navigate("/"); 
							}else{
								actions.iniciaUserDatos();
								setMensaje(response);
								handleShow();
							}
			 })
	}

	function ModalAceptar() {
		return (
		  <>
			<Modal show={show} onHide={handleClose}>
			  <Modal.Header closeButton>
				<Modal.Title> Error en el login de usuario</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>{mensaje["msg"]}</Modal.Body>
			  <Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
				  Close
				</Button>
			  </Modal.Footer>
			</Modal>
		  </>
		);
	  }

	return (
		<div className="text-center mt-5">
			<h1>Esta es la página de Login</h1>

			<form onSubmit={hacerLogin}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" name="user" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" name="pwd" placeholder="Password" onChange={handleChange} />
				</div>
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
				</div>
				<button type="submit" className="btn btn-primary">Login</button>
			</form>

			<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>

			{ModalAceptar()}	
		</div>
	);
};
