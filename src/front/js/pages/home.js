import React, { useEffect, useContext } from "react";
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
		localStorage.removeItem('token');
		actions.delUserConectado()
		navigate('/');
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
				{!(usuario["user"]) && <Link to="/signup" 	type="button" className="btn btn-primary mx-3">SignUp</Link> } 
				{!(usuario["user"])  ? <Link to="/login" 	type="button" className="btn btn-secondary mx-3">Login</Link> : 
									   <Link to="/" 		type="button" className="btn btn-secondary mx-3" onClick={logout}>Logout</Link> }
				
				{/*(localStorage.getItem('token')) && <Link to="/signup" 	type="button" className="btn btn-primary mx-3">SignUp2</Link> } 
				{(localStorage.getItem('token')) ?  <Link to="/login" 	type="button" className="btn btn-secondary mx-3">Login2</Link> : 
															<Link to="/" 		type="button" className="btn btn-secondary mx-3" onClick={logout}>Logout2.1</Link> */}
				
				{/*<Link to="/private" type="button" className="btn btn-success mx-3">Private</Link>*/}
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