const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			logado: false,
 			userDatos: {}	// {user: "",
							// nombre: "", 
							// is_active: true
						    //}		
		},
		actions: {
			//--------------------------------------------------------------------
			// Cargar la variable Token de usuario
			//--------------------------------------------------------------------
			setLogado: (estado) => {
				setStore({logado: estado});
			},

			//--------------------------------------------------------------------
			// Guardamos datos de usuario en el signup 
			//-------------------------------------------------------------------- 
			setUserDatos: (usuario, miNombre, activo=true) => {
				try{
					// ------------
					// Validamos datos de entrada
					// ------------
					
					// ------------
					// Guardamos la información
					// ------------
					setStore({ userDatos: {"user": usuario
										  ,"nombre": miNombre
										  ,"is_active": activo} });
					setStore({logado : true});

				}catch(error){
					console.log("Error en la validación de datos", error)
				}
			},
			getUserDatos: () => {
				try{
					setStore({ userDatos: {"user": usuario
										  ,"nombre": miNombre
										  ,"is_active": activo} });
				}catch(error){
					console.log("Error en la validación de datos", error)
				}
			},


			iniciaUserDatos: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('id');
				setStore({ userDatos: {} });
				setStore({logado : false});
			},

			//--------------------------------------------------------------------
			// Use getActions to call a function within a fuction
			//--------------------------------------------------------------------
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
