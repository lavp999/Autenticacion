/**
 * 
 * @returns:
 *      0 -> es que ha ido OK y se ha encontrado dato, por lo que "contenido" retorna u  objeto con Email, nombre y activo
 *      1 -> Es que no ha encontrado al usuario, por lo que "contenido" tendrán un objeto con un msg
 *     -1 -> Es un error no controlado
 */
export function getMember( contenido ){
    const myToken = localStorage.getItem("token");
    let ret = -1;

    fetch(process.env.BACKEND_URL + "/api/member", 
            {method: 'GET',
             headers:{"Content-Type": "application/json"
                    ,"Authorization": 'Bearer ' + myToken}
            }) 
    .then(response => response.json())
    .then((response)=>{	
                        if(typeof response["msg"] === 'undefined'){
                            console.log("Response a parte1", response);
                            ret = 0;
                            contenido = {"email": response["email"]
                                        ,"nombre": response["nombre"]
                                        ,"is_active": response["is_active"] }
                        }else{
                            console.log("Response a parte2", response);
                            ret = 1;
                            contenido = response;
                        };
            });
};
