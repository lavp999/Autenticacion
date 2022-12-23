import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Esta es la pagina de alta</h1>
			<form>
				<div className="row">
					<div className="col form-group">
						<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="col form-group">
						<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					</div>
					<div className="col form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1" />
						<label className="form-check-label" for="exampleCheck1">Check me out</label>
					</div>
				</div>
			</form>


			<div className="alert alert-info">
				<Link to="/signup" type="button" class="btn btn-primary mx-3">SignUp</Link>
				<Link to="/" type="button" class="btn btn-success mx-3">Home</Link>
			</div>
		</div>
	);
};
