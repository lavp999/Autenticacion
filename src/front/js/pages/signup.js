import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	const guardaDatos = () => {
		var email = document.getElementById("InputEmail").value;
		var pwd = document.getElementById("InputPassword").value;

		actions.setSignup(email, pwd);
	}

	return (
		<div className="text-center mt-5">
			<h1>Esta es la pagina de alta</h1>
			<form>
				<div className="row">
					<div className="col form-group">
						<input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" value="usuario@mail.com" />
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="col form-group">
						<input type="password" className="form-control" id="InputPassword" placeholder="Password"/>
					</div>
					<div className="col form-check">
						<input type="checkbox" className="form-check-input" id="Check1" />
						<label className="form-check-label" for="Check1">Check me out</label>
					</div>
				</div>
			</form>


			<div className="alert alert-info">
				<Link to="/okSignup" type="button" onClick={guardaDatos} className="btn btn-primary mx-3">SignUp</Link>
				<Link to="/" type="button" className="btn btn-success mx-3">Home</Link>
			</div>
		</div>
	);
};
