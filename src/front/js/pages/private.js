import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Privada = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>esta es la página privada</h1>
			<div className="alert alert-info">
				<Link to="/private" type="button" class="btn btn-success mx-3">Private</Link>
				<Link to="/" type="button" class="btn btn-primary mx-3">Home</Link>
			</div>
		</div>
	);
};
