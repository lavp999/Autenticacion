import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const logout = () => {
		console.log("Uno",localStorage.getItem('token'));
		actions.iniciaUserDatos()
		console.log("dos",localStorage.getItem('token'));
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello {(store.userDatos["nombre"]) ? store.userDatos["nombre"] : "" }!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<div className="alert alert-info">
				{!(store.logado) && <Link to="/signup" 	type="button" className="btn btn-primary mx-3">SignUp</Link> } 
				{!(store.logado) ? <Link to="/login" 	type="button" className="btn btn-secondary mx-3">Login</Link> : 
									   <button type="button" className="btn btn-secondary mx-3" onClick={logout}>Logout</button> }
				
				{/* <Link to="/private" type="button" className="btn btn-success mx-3">Private</Link> */}
				<Link to="/members" type="button" className="btn btn-success mx-3">Usuarios</Link>
				<Link to="/member" 	type="button" className="btn btn-success mx-3">Mis Datos</Link>
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};

/**
 * 
 * 				{!(store.logado) ? <Link to="/login" 	type="button" className="btn btn-secondary mx-3">Login</Link> : 
									   <button type="button" className="btn btn-secondary mx-3" onClick={()=>{logout(actions.setLogado(false), actions.iniciaUserDatos())}}>Logout</button> }

 */