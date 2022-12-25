import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const OkSignUp = () => {
	const { store, actions } = useContext(Context);

    const misDatos = () => {
        const misDatos = actions.getSignup();
        console.log("Este es mi usuario: ",misDatos["user"]);
        return misDatos["user"];
    }

    return(<>
        <h1>Esto son mis datos</h1>
        <p>Usuario: {misDatos()}</p>
    </>)
}