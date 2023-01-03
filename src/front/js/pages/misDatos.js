import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const MisDatos = () => {
	const [miembros, setMiembros] = useState([{}]);

	function getMember(){
		let datos = [];
		let myToken = localStorage.getItem("token");

		fetch("https://3001-lavp999-autenticacion-ax05009bb6d.ws-eu80.gitpod.io/api/members", 
			  {method: 'GET',
			   headers:{"Content-Type": "application/json", "Authorization": myToken}
			  }) 
		.then(response => response.json())
		.then((response)=>{	console.log("response: ", response);
			  				datos = response;
							setMiembros(response);
			 })
	}

	useEffect(() => {
		getMember();
	  },[]);

	return (
		<div className="text-center mt-5">
			<h1>listado de miembros</h1>
			{console.log("datos", miembros)}
			<ul>
				{(miembros.length == 0) ? 'Cargando.....' : miembros.map((e, i) => {return (<li key={i}> {e["email"]} </li>)})}
			</ul>


			<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>
		</div>
	);
};
