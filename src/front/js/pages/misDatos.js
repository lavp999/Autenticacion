import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { MI_RUTA } from "../../js/utils"

export const MisDatos = () => {
	const {store, actions} = useContext(Context);
	const myToken = localStorage.getItem("token");
	const [mensaje, setMensaje] = useState();

	const conPermisos = () => {
		return (<div className="card tarjeta">
					<img className="card-img-top" src="https://placeimg.com/200/200/people" alt="yo mismo" />
					<div className="card-body">
						<h5 className="card-title">Mis Datos</h5>
						<p className="card-text">Estos son mis datos!!</p>
						<p className="card-text">Nombre: {store.userDatos["nombre"]} </p>
						<p className="card-text">Email: {store.userDatos["user"]} </p>		
						<p className="card-text">Activo?: {(store.userDatos["is_active"] ? "Si" : "No")} </p>
					</div>
				</div>);
	}

	const sinPermisos = () => {
		return (<div> 
					<h1 className="card-title">Mensaje: {mensaje && mensaje["msg"]}</h1> 
				</div>);
	}

	useEffect(() => {
		const mi_ruta = (process.env.BACKEND_URL ? process.env.BACKEND_URL : MI_RUTA);

		console.log("Mi Ruta: ", mi_ruta);

		fetch(mi_ruta + "/api/member", 
				{method: 'GET',
					headers:{"Content-Type": "application/json"
						,"Authorization": 'Bearer ' + myToken}
				}) 
		.then((response) => {if(response.status = 200){
							 	return response.json();
							 }
							})
		.then((response)=>{	if(response["msg"]){
								setMensaje(response);
							}else{
								actions.setUserDatos(response["user"], response["nombre"], response["is_Active"]);
								setMensaje({});
							};
				})
		.catch(error => {
					setMensaje({msg: "No tienes permisos para entrar en esta sección ("+ error.toString() + ")"});
				});

	},[]);

	return ( 
		<div className="text-center mt-5">
			{store.logado ? conPermisos() : sinPermisos()} 
			
			<div className="alert alert-info">
				<Link to="/" type="button" className="btn btn-primary mx-3">Home</Link>
			</div>
		</div>
	);
};