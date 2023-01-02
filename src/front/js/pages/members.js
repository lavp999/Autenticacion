import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Members = () => {
	const [miembros, setMiembros] = useState([{}]);

	function getMembers(){
		let datos = [];

		fetch(process.env.BACKEND_URL + "/api/members", 
			  {method: 'GET',
			   headers:{"Content-Type": "application/json"}
			  }) 
		.then(response => response.json())
		.then((response)=>{	console.log("response: ", response);
			  				datos = response;
							setMiembros(response);
							//datos.forEach(e => {
							//	setMiembros([...miembros, {"email" : e["email"]}])
							//});
			 })

	}

	useEffect(() => {
		getMembers();
	  });

	const lista = () => {
		const miLi = miembros.map((e, i) => {return ("<li>" +  e["email"] + "</li>")})


		console.log(miLi);
		return "Adios";
	}

	return (
		<div className="text-center mt-5">
			<h1>listado de miembros</h1>
			{console.log("datos", miembros)}
			<ul>
				<li>{miembros[0]["email"]}</li>
				{(miembros.length == 0) ? 'Cargando.....' : miembros.map((e, i) => {return ("<li>" + e["email"] + "</li>")})}
				{miembros.forEach((e) =>{
										"<li>"+ e["email"] +"</li>"
										})
				}
			</ul>


			<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>
		</div>
	);
};
