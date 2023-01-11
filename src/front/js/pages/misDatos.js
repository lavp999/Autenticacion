import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { getMember } from "../utils";

export const MisDatos = () => {
	const {store, actions} = useContext(Context);

	function Buscar(){
		let result = 200;
		let myToken = localStorage.getItem("token");
	
		fetch(process.env.BACKEND_URL + "/api/member", 
				{method: 'GET',
				headers:{"Content-Type": "application/json"
						,"Authorization": 'Bearer ' + myToken}
				}) 
		.then(response => response.json())
		.then((response)=>{	console.log("Response a parte", response)
							if(typeof response["msg"] === 'undefined'){
								actions.setMensaje(response);
								result = 401;
							}else{
								actions.setUserConectado(response["email"], response["nombre"], response["is_active"])
							};
				});
	}


	const sinPermisos = () => {
		return (<div className="card tarjeta">
					<img className="card-img-top" src="https://placeimg.com/200/200/people" alt="yo mismo" />
					<div className="card-body">
						<h5 className="card-title">Mis Datos</h5>
						<p className="card-text">Estos son mis datos!!</p>
						<p className="card-text">Nombre: {store.userConectado["nombre"]} </p>
						<p className="card-text">Email: {store.userConectado["email"]} </p>		
						<p className="card-text">Activo?: {store.userConectado["is_active"]} </p>
					</div>
				</div>);
	}

	const conPermisos = () => {
		return (<div> 
					<h1 className="card-title">Mensaje: {store.mensaje["msg"]}</h1> 
				</div>);
	}


	useEffect(() => {
		let respuesta = {};
		
		getMember(respuesta);
		console.log("esta respuesta: ", respuesta);

		if(store.mensaje["msg"] != "undefined"){
			actions.setMensaje(respuesta);
			console.log("mensaje: ", store.mensaje["msg"], actions.getMensaje(respuesta));
		}else{
			actions.setUserConectado(respuesta["email"], respuesta["nombre"], respuesta["is_active"])
			console.log("user: ", store.userConectado["email"]);
		};
		// Buscar();
	  },[]);

	return ( 
		
		<div className="text-center mt-5">
			{store.mensaje["msg"] ? sinPermisos() : conPermisos()}
			
			<div className="alert alert-info">
				<Link to="/" type="button" className="btn btn-primary mx-3">Home</Link>
			</div>
		</div>
	);
};


/*

function Buscar(){
		let myToken = localStorage.getItem("token");
		console.log("estoy autenticado?", myToken);

		fetch(process.env.BACKEND_URL + "/api/member", 
			  {method: 'GET',
			   headers:{"Content-Type": "application/json"
			   		   ,"Authorization": 'Bearer ' + myToken}
			  }) 
		.then(response => response.json())
		.then((response)=>{	console.log("response: ", typeof response["msg"], response["msg"], response);
			  				if(typeof response["msg"] === 'undefined'){
								setDatosUser(response);
								console.log("datosUser: ", datosUser);
							}else{
								setDatosUser({"msg": "No estás autorizado par ver esta página"});
							}
							;
			 })
	}




	function Buscar(){
		const resultado = getMember();
	}


*/