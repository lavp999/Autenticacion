import { useContext }    from "react";
import { Context } from "./store/appContext";

export const getMember = () => {
    const {store, actions} = useContext(Context);
    let result = 200;
    let myToken = localStorage.getItem("token");

    fetch(process.env.BACKEND_URL + "/api/member", 
            {method: 'GET',
            headers:{"Content-Type": "application/json"
                    ,"Authorization": 'Bearer ' + myToken}
            }) 
    .then(response => response.json())
    .then((response)=>{	console.log("Response a parte", response)
                        if(typeof response["msg"] === 'undefined'){
                            actions.setMensaje(response);
                            result = 401;
                        }else{
                            actions.setUserConectado(response["email"], response["nombre"], response["is_active"])
                        };
            });
    return result;
};
