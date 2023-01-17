/**
 * 
 * @returns:
 *      0 -> es que ha ido OK y se ha encontrado dato, por lo que "contenido" retorna u  objeto con Email, nombre y activo
 *      1 -> Es que no ha encontrado al usuario, por lo que "contenido" tendrán un objeto con un msg
 *     -1 -> Es un error no controlado
 */
import React, { useContext } from "react";
import { Context } from "./store/appContext";

export const MI_RUTA = "https://3001-lavp999-autenticacion-dfpovy53i8j.ws-eu82.gitpod.io";

export async function getMember(  ){ 
    const myToken = localStorage.getItem("token");
    const { actions, store } = useContext(Context);

    fetch(process.env.BACKEND_URL + "/api/member", 
            {method: 'GET',
             headers:{"Content-Type": "application/json"
                    ,"Authorization": 'Bearer ' + myToken}
            }) 
    .then(response => response.json())
    .then((response)=>{	
                        if(typeof response["msg"] === 'undefined'){
                            console.log("Response a parte1", response);
                            // actions.setUserNoConectado(response["msg"]);
                        }else{
                            console.log("Response a parte2", response);
                            //actions.setUserConectado(respuesta["user"],respuesta["nombre"],respuesta["is_active"]);
                        };
            });
};



export const logout = (setLogado, iniciaUserDatos) => {
    const { actions, store } = useContext(Context);
    
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setLogado(false);
    iniciaUserDatos()

}