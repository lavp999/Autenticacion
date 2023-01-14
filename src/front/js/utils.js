/**
 * 
 * @returns:
 *      0 -> es que ha ido OK y se ha encontrado dato, por lo que "contenido" retorna u  objeto con Email, nombre y activo
 *      1 -> Es que no ha encontrado al usuario, por lo que "contenido" tendrán un objeto con un msg
 *     -1 -> Es un error no controlado
 */
export async function getMember( contenido ){
    const myToken = localStorage.getItem("token");

    contenido = {"msg": "No entramos ni en el fetch"}

    await fetch(process.env.BACKEND_URL + "/api/member", 
            {method: 'GET',
             headers:{"Content-Type": "application/json"
                    ,"Authorization": 'Bearer ' + myToken}
            }) 
    .then(response => response.json())
    .then((response)=>{	
                        if(typeof response["msg"] === 'undefined'){
                            console.log("Response a parte1", response);
                            contenido = response;
                            console.log("Response a parte1.1", contenido);
                        }else{
                            console.log("Response a parte2", response);
                            contenido = response;
                        };
            });
};
