import React, { useState } from "react";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const handleChange = (evento) =>{
		setFormData({...formData, [evento.target.name]: evento.target.value});
	}

	const handleSubmit = (evento)=>{
		evento.preventDefault(); // para evitar la recarga ya que cancela el evento
		console.log("signup antes :", formData, process.env.BACKEND_URL)

		fetch(process.env.BACKEND_URL + "/api/signup", 
			  {method: 'POST',
			   headers:{"Content-Type": "application/json"},
			   body: JSON.stringify(formData),
			  })
		.then(response => response.json())
		.then((response)=>{	console.log(response)
							navigate("/login");
			 })

	}
/*
Access to fetch at 'https://3001-lavp999-autenticacion-z1lxowc4ql4.ws-eu81.gitpod.io/api/signup' from origin 'https://3000-lavp999-autenticacion-z1lxowc4ql4.ws-eu81.gitpod.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
signup.js:17          POST https://3001-lavp999-autenticacion-z1lxowc4ql4.ws-eu81.gitpod.io/api/signup net::ERR_FAILED 500
handleSubmit @ signup.js:17
callCallback @ react-dom.development.js:188
invokeGuardedCallbackDev @ react-dom.development.js:237
invokeGuardedCallback @ react-dom.development.js:292
.......
discreteUpdates$1 @ react-dom.development.js:21887
discreteUpdates @ react-dom.development.js:806
dispatchDiscreteEvent @ react-dom.development.js:4168
signup.js:17                  Uncaught (in promise) TypeError: Failed to fetch
    at handleSubmit (signup.js:17:1)
    at HTMLUnknownElement.callCallback (reac
*/
	return (
		<div className="text-center mt-5">
			<h1>Esta es la pagina de alta</h1>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col form-group">
						<input type="text" className="form-control" id="InputNombre" value={"Luis A. Vicente"} name="nombre" onChange={handleChange}/>
					</div>
					<div className="col form-group">
						<input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" name="user" onChange={handleChange}/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="col form-group">
						<input type="password" className="form-control" id="InputPassword" placeholder="Password" name="pwd" onChange={handleChange}/>
					</div>
					<div className="col">
						<button type="submit" className="btn btn-primary mx-3" id="button1" name="boton">Alta usuario</button>
					</div>
				</div>
			</form>


			<div className="alert alert-info">
				{/*<Link to="/okSignup" type="button" onClick={guardaDatos} className="btn btn-primary mx-3">SignUp</Link> */} 
				<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>
			</div>
		</div>
	);
};
