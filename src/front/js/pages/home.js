import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<div className="alert alert-info">
				<Link to="/signup" type="button" className="btn btn-primary mx-3">SignUp</Link>
				<Link to="/login" type="button" className="btn btn-secondary mx-3">Login</Link>
				<Link to="/private" type="button" className="btn btn-success mx-3">Private</Link>
				<Link to="/members" type="button" className="btn btn-success mx-3">Usuarios</Link>
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
