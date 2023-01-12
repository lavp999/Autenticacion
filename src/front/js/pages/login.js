import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link , useNavigate } from "react-router-dom";

export const Login = () => {
	const [formData, setFormData] = useState({});
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}
	const hacerLogin = (evento) => { 
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		const data = {"user": formData["user"], "pwd": formData["pwd"]} 
		console.log("login Antes:", data, process.env.BACKEND_URL)  

		fetch(process.env.BACKEND_URL + "/api/login", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(data),
			  }) 
		.then(response => response.json())
		.then((response)=>{	console.log("hacerLogin", typeof response["token"], response)
			  				if(typeof response["token"] === 'undefined'){
								actions.setMensaje("Mi mensaje");
							}else{
								localStorage.setItem("token", response["token"]);
								localStorage.setItem("id_user", response["user_id"]);
								actions.setUserConectado(response["user"], response["nombre"], response["is_Active"]);
								console.log("hacer Login2", actions.getUserConectado());
								navigate("/"); 
							}
			 })
	}

	return (
		<div className="text-center mt-5">
			<h1>Esta es la página de Login</h1>

			<form onSubmit={hacerLogin}>
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" name="user" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" name="pwd" placeholder="Password" onChange={handleChange} />
				</div>
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
					<label className="form-check-label" for="exampleCheck1">Check me out</label>
				</div>
				<button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
			</form>

			<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						...
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
					</div>
				</div>
			</div>





		</div>
	);
};



/*
	const hacerLogin = (evento) => { 
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento

		const data = {"user": formData["user"], "pwd": formData["pwd"]} 
		console.log("login Antes:", data, process.env.BACKEND_URL) 

		fetch(process.env.BACKEND_URL + "/api/login", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(data),
			  }) 
		.then(response => response.json())
		.then((response)=>{	console.log("hacerLogin", typeof response["token"], response)
			  				if(typeof response["token"] === 'undefined'){
								actions.setMensaje("Mi mensaje");
							}else{
								localStorage.setItem("token", response["token"]);
								localStorage.setItem("id_user", response["user_id"]);
								actions.setUserConectado(response["nombre"], response["token"]);
								console.log("hacer Login2", actions.getUserConectado());
								navigate("/"); 
							}
			 })
	}


*/