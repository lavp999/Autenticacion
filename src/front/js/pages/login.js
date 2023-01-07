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
								navigate("/login");
							}else{
								localStorage.setItem("token", response["token"]);
								actions.setUserConectado(response["nombre"], 'pwd');
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
				<button type="submit" className="btn btn-primary">Login</button>
			</form>

			<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>

			<div className="alert alert-info">
			</div>
		</div>
	);
};
