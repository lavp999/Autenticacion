import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import Modals from "../component/modals";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const usuario = actions.getUserConectado();
	const navigate = useNavigate();

	const logout = () => {
		{console.log("logout1:", localStorage.getItem('token'), localStorage.getItem('token') == null, localStorage.getItem('token') == 'null', localStorage.getItem('token') === null)}
		localStorage.removeItem('token');
		navigate('/');
		{console.log("logout2:", localStorage.getItem('token'), localStorage.getItem('token') == null, localStorage.getItem('token') == 'null', localStorage.getItem('token') === null)}
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello {(usuario["user"] === '') ? "Rigo" : usuario["user"]}!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<div className="alert alert-info">
				{console.log("SignUp:", localStorage.getItem('token'), localStorage.getItem('token') == null, localStorage.getItem('token') == 'null', localStorage.getItem('token') === null)}

				{(localStorage.getItem('token') == 'null') && <Link to="/signup" type="button" className="btn btn-primary mx-3">SignUp1</Link> } 
				{(localStorage.getItem('token') == 'null') ?  <Link to="/login"  type="button" className="btn btn-secondary mx-3">Login1</Link> : 
															  <Link to="/" 		 type="button" className="btn btn-secondary mx-3" onClick={logout}>Logout1.1</Link> }
				
				{(localStorage.getItem('token') == null) && <Link to="/signup" 	type="button" className="btn btn-primary mx-3">SignUp2</Link> } 
				{(localStorage.getItem('token') == null) ?  <Link to="/login" 	type="button" className="btn btn-secondary mx-3">Login2</Link> : 
															<Link to="/" 		type="button" className="btn btn-secondary mx-3" onClick={logout}>Logout2.1</Link> }
				
				<Link to="/private" type="button" className="btn btn-success mx-3">Private</Link>
				<Link to="/members" type="button" className="btn btn-success mx-3">Usuarios</Link>
				<Link to="/member" 	type="button" className="btn btn-success mx-3">Mis Datos</Link>
				<Link to="/" 		type="button" className="btn btn-secondary mx-3">Home</Link>
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			<Modals/>
		</div>
	);
};