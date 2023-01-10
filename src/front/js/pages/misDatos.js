import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { Link , useNavigate } from "react-router-dom";
import { getMember } from "../utils";

export const MisDatos = () => {
	const [datosUser, setDatosUser] = useState({});
	const navigate = useNavigate();

	function Buscar(){
		getMember();
	}


	const sinPermisos = () => {
		return (<div className="card tarjeta">
					<img className="card-img-top" src="https://placeimg.com/200/200/people" alt="yo mismo" />
					<div className="card-body">
						<h5 className="card-title">Mis Datos</h5>
						<p className="card-text">Estos son mis datos!!</p>
						<p className="card-text">Nombre: {datosUser["nombre"]} </p>
						<p className="card-text">Email: {datosUser["email"]} </p>		
						<p className="card-text">Activo?: {datosUser["is_active"]} </p>
					</div>
				</div>);
	}

	const conPermisos = () => {
		return (<div> 
					<h1 className="card-title">{datosUser["msg"]}</h1> 
				</div>);
	}


	useEffect(() => {
		Buscar();
	  },[]);

	return ( 
		
		<div className="text-center mt-5">
			{datosUser["msg"] ? conPermisos() : sinPermisos()}
			
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

*/