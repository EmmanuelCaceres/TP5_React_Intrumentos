
import Instrumento from "../Entities/Intrumento";
import PagoMP from "../Entities/PagoMP";
import Pedido from "../Entities/Pedido";
import PreferenceMP from "../Entities/PreferenceMP";
import Usuario from "../Entities/Usuario";
//Traemos todos los instrumentos

export async function getAll<T>(path:String) : Promise<T>{
    // const url = "http://localhost:8080/instrumentos"
    const response = await fetch(`${path}`,{
        method:'GET',
        headers:{
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        },
        mode: 'cors'
    })
    const data = await response.json();
    return data;
}

//Traemos 1 instrumento por id

export async function getInstrumentoById(id:Number){
  const url = `http://localhost:8080/instrumentos/${id}`
  const response = await fetch(url,{
      method:'GET',
      headers:{
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": '*'
      },
      mode: 'cors'
  })
  const data = await response.json();
  return data as Instrumento;
}


  // Función generica para enviar datos mediante una solicitud POST
 export async function postData<T>(path: string, data: T): Promise<T> {
  console.log(data);
    try {
      const response = await fetch(`${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); // Retorna los datos en formato JSON
    } catch (error) {
      return Promise.reject(error); // Rechaza la promesa con el error
    }
  }
  
  // Función generica para actualizar datos mediante una solicitud PUT
 export async function putData<T>(path: string, data: T): Promise<T> {
    try {
      const response = await fetch(`${path}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
      });
  
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); // Retorna los datos en formato JSON
    } catch (error) {
      return Promise.reject(error); // Rechaza la promesa con el error
    }
  }
  
  // Función generica para eliminar datos mediante una solicitud DELETE
  export async function deleteData(path: string) {
    try {
      const response = await fetch(`${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors'
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.error(error); // Imprime el error en la consola
    }
  }

  export async function PostPedidoData<T>(path: string, data:T) {
    console.log(data);
    try {
      const response = await fetch(`${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json() as T; // Retorna los datos en formato JSON
    } catch (error) {
      return Promise.reject(error); // Rechaza la promesa con el error
    }
  }

  export async function createPreferenceMP(pagoMP?:PagoMP){
    let urlServer = 'http://localhost:8080/create_preference_mp';
    const response = await fetch(urlServer, {
	  method: "POST",
	  body: JSON.stringify(pagoMP),
	  headers: {
		"Content-Type": 'application/json'
	  },
    mode: 'cors'
	  });
    return await response.json() as PreferenceMP;   
  } 
  
  export async function registerUser<Usuario>(usuario:Usuario):Promise<Usuario>{
    console.log(JSON.stringify(usuario))
    let urlServer = 'http://localhost:8080/registro';
    const response = await fetch(urlServer, {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
      "Content-Type": 'application/json'
      },
      mode: 'cors'
      });
      // console.log(response.json())
      return await response.json() as Usuario;   
  }

  export async function loginUser(usuario: Usuario): Promise<Usuario | string> {
    let urlServer = 'http://localhost:8080/login';
      const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
          "Content-Type": 'application/json'
        },
        mode: 'cors'
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.error) {
          console.log(errorResponse.error.valueOf())
          return errorResponse.error as string;
        } else {
          return "Error desconocido.";
        }
      }
  
      return await response.json() as Usuario;
  
  }

  export async function getDataPieChart(path:String){
    // const url = "http://localhost:8080/instrumentos"
    const response = await fetch(`${path}`,{
        method:'GET',
        headers:{
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        },
        mode: 'cors'
    })
    console.log(response)
    return await response.json();
}
  export async function getDataBarChart(path:String){
    // const url = "http://localhost:8080/instrumentos"
    const response = await fetch(`${path}`,{
        method:'GET',
        headers:{
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*'
        },
        mode: 'cors'
    })
    console.log(response)
    return await response.json();
}

export async function postImagen(path:string,file:FormData):Promise<string | null>{
  const response = await fetch(`${path}`, {
      method: "POST",
      body: file,
  });
  if (response.ok) {
    const uploadedFileName = await response.text(); // Parse the filename
    return uploadedFileName;
  }
  return null;
}